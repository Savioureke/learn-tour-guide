import React, { useState, useEffect } from 'react';
import { enrollStudent } from '../lib/supabase';

export default function EnrollmentModal({ isOpen, onClose, mentors, preselectedMentor }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    guide_id: '',
    notes: ''
  });

  const [selectedGuide, setSelectedGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync preselected mentor when modal opens or mentor changes
  useEffect(() => {
    if (preselectedMentor) {
      setFormData(prev => ({
        ...prev,
        guide_id: preselectedMentor.id
      }));
      setSelectedGuide(preselectedMentor);
    } else if (mentors && mentors.length > 0 && !formData.guide_id) {
      setFormData(prev => ({
        ...prev,
        guide_id: mentors[0].id
      }));
      setSelectedGuide(mentors[0]);
    }
  }, [preselectedMentor, mentors, isOpen]);

  // Handle ESC close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
      setSuccessResult(null);
      setErrorMessage('');
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleGuideChange = (e) => {
    const guideId = e.target.value;
    const guide = mentors.find(m => m.id === guideId) || null;
    setSelectedGuide(guide);
    setFormData(prev => ({ ...prev, guide_id: guideId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage('Please fill in your name, email, phone number, and address.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        guide_id: selectedGuide ? selectedGuide.id : null,
        guide_name: selectedGuide ? selectedGuide.name : 'General Tour Guide Cohort',
        guide_rate: selectedGuide ? (selectedGuide.rate || '$45/hr') : null,
        notes: formData.notes
      };

      const record = await enrollStudent(payload);
      setSuccessResult(record);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        guide_id: mentors && mentors[0] ? mentors[0].id : '',
        notes: ''
      });
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(err.message || 'Unable to complete enrollment. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#DF6951]/5 to-[#F1A501]/5">
          <div>
            <span className="text-xs font-bold text-danger uppercase tracking-wider">
              Student Admission & Mentorship
            </span>
            <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold">
              Enroll in Tour Guide Academy
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {successResult ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h4 className="font-cursive text-dark text-2xl font-bold">
                Enrollment Confirmed!
              </h4>

              <p className="text-secondary text-sm max-w-md mx-auto">
                Welcome to TourGuide Academy, <strong className="text-dark">{successResult.name}</strong>. 
                Your student profile has been synced with our central admin database.
              </p>

              <div className="bg-[#F0F4F9] rounded-2xl p-4 text-left space-y-2 text-xs text-secondary max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="font-medium">Assigned Master Mentor:</span>
                  <span className="font-bold text-dark">{successResult.guide_name || 'Assigned Lead Guide'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Mentor Mentorship Rate:</span>
                  <span className="font-bold text-primary">{successResult.guide_rate || 'Included in Tuition'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Student Email:</span>
                  <span className="font-bold text-dark">{successResult.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Student ID:</span>
                  <span className="font-mono text-[11px] text-gray-500">{successResult.id?.slice(0, 13)}...</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSuccessResult(null);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-primary-btn transition-all"
                >
                  Close & Watch Intro Video
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Elena Vance"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark placeholder:text-gray-400 outline-none transition-all"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark placeholder:text-gray-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555-019-2834"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark placeholder:text-gray-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                  Residential Address / City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address, City, Country"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark placeholder:text-gray-400 outline-none transition-all"
                />
              </div>

              {/* Select Tutor/Teacher from Supabase */}
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                  Choose Instructor / Mentor <span className="text-danger">*</span>
                </label>
                <select
                  name="guide_id"
                  value={formData.guide_id}
                  onChange={handleGuideChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark bg-white outline-none transition-all"
                >
                  {mentors && mentors.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.name} — {guide.location} ({guide.rate || '$45/hr'})
                    </option>
                  ))}
                </select>

                {selectedGuide && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs text-secondary">
                    <div>
                      <span className="font-semibold text-dark">{selectedGuide.name}</span>
                      <span className="mx-2">·</span>
                      <span>{selectedGuide.specialty}</span>
                    </div>
                    <span className="font-bold text-primary bg-white px-2 py-0.5 rounded shadow-sm">
                      {selectedGuide.rate || '$45/hr'}
                    </span>
                  </div>
                )}
              </div>

              {/* Notes / Career Objectives */}
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                  Career Goals or Guiding Interests (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  placeholder="e.g. Interested in historical walking tours and luxury museum guiding."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark placeholder:text-gray-400 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-white font-medium text-base shadow-primary-btn hover:bg-primary-hover disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Syncing with Supabase Central Admin...</span>
                    </>
                  ) : (
                    <span>Confirm Registration & Assign Mentor</span>
                  )}
                </button>
                <p className="text-[11px] text-center text-secondary mt-2">
                  🔒 Data is securely stored in the shared Tour Guide database and immediately visible to administrators.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
