import React, { useState, useEffect } from 'react';
import { studentSignUp, studentLogin } from '../lib/supabase';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signup',
  mentors = [],
  preselectedMentor = null,
  onAuthSuccess
}) {
  const [mode, setMode] = useState(initialMode); // 'signup' | 'login'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sign up fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [guideId, setGuideId] = useState('');
  const [notes, setNotes] = useState('');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (preselectedMentor) {
      setGuideId(preselectedMentor.id);
    } else if (mentors && mentors.length > 0 && !guideId) {
      setGuideId(mentors[0].id);
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
      setErrorMessage('');
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in your name, email, and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const selectedGuide = mentors.find(m => m.id === guideId) || null;

      const newStudent = await studentSignUp({
        name,
        email,
        password,
        phone,
        address,
        guide_id: selectedGuide ? selectedGuide.id : null,
        guide_name: selectedGuide ? selectedGuide.name : null,
        guide_rate: selectedGuide ? selectedGuide.rate : null,
        notes
      });

      onAuthSuccess(newStudent);
      onClose();
    } catch (err) {
      console.error('Sign up failed:', err);
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    try {
      const student = await studentLogin(loginEmail, loginPassword);
      onAuthSuccess(student);
      onClose();
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Mode Tabs */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-[#DF6951]/5 to-[#F1A501]/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(''); }}
              className={`text-base sm:text-lg font-bold pb-1 transition-all ${
                mode === 'signup'
                  ? 'text-dark border-b-2 border-primary'
                  : 'text-gray-400 hover:text-dark'
              }`}
            >
              Student Sign Up
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`text-base sm:text-lg font-bold pb-1 transition-all ${
                mode === 'login'
                  ? 'text-dark border-b-2 border-primary'
                  : 'text-gray-400 hover:text-dark'
              }`}
            >
              Student Login
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-secondary hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
              {errorMessage}
            </div>
          )}

          {mode === 'signup' ? (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                    Create Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-019-2834"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                    Address / City
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rome, Italy"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                  />
                </div>
              </div>

              {/* Select Instructor from Backend */}
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                  Select Master Mentor (Live from Database)
                </label>
                <select
                  value={guideId}
                  onChange={(e) => setGuideId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark bg-white outline-none"
                >
                  <option value="">-- Choose an Instructor (or pick later in dashboard) --</option>
                  {mentors.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.name} — {guide.location} ({guide.rate || '$45/hr'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1">
                  Learning Goals (Optional)
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us what type of tours you want to lead..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-medium text-sm shadow-primary-btn hover:bg-primary-hover disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account & Loading Dashboard...</span>
                    </>
                  ) : (
                    <span>Register & Open Student Dashboard</span>
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-secondary pt-2">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className="text-primary font-bold hover:underline"
                >
                  Log in to your account
                </button>
              </div>
            </form>
          ) : (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4 py-2">
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm text-dark outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-dark text-white font-medium text-sm hover:bg-primary hover:text-white disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <span>Sign In to Student Dashboard</span>
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-secondary pt-2">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMessage(''); }}
                  className="text-primary font-bold hover:underline"
                >
                  Sign up for the Academy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
