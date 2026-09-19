import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { TOUR_GUIDE_TUTORIALS } from '../data/tutorials';
import { updateCompletedTutorials, updateStudentMentor, fetchTourGuides } from '../lib/supabase';

export default function StudentDashboard({ student, onLogout, onBackToHome, onUpdateStudent }) {
  const [activeTutorial, setActiveTutorial] = useState(TOUR_GUIDE_TUTORIALS[0]);
  const [completedList, setCompletedList] = useState(student.completed_tutorials || []);
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [mentorUpdateLoading, setMentorUpdateLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load mentors strictly from the Supabase backend
  useEffect(() => {
    async function loadBackendMentors() {
      try {
        setLoadingMentors(true);
        const data = await fetchTourGuides();
        setMentors(data);
      } catch (err) {
        console.error('Failed to load mentors from backend:', err);
      } finally {
        setLoadingMentors(false);
      }
    }
    loadBackendMentors();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleToggleComplete = async (tutorialId) => {
    const isCompleted = completedList.includes(tutorialId);
    const updated = isCompleted
      ? completedList.filter(id => id !== tutorialId)
      : [...completedList, tutorialId];

    setCompletedList(updated);

    try {
      await updateCompletedTutorials(student.id, updated);
      onUpdateStudent({ ...student, completed_tutorials: updated });
      showToast(isCompleted ? 'Tutorial marked as incomplete.' : '🎉 Tutorial completed! Progress saved to Supabase.');
    } catch (err) {
      console.error('Failed to update tutorial progress:', err);
      showToast('Could not save progress. Please try again.');
    }
  };

  const handleSelectMentor = async (mentor) => {
    if (student.guide_id === mentor.id) return;

    setMentorUpdateLoading(true);
    try {
      const updatedStudent = await updateStudentMentor(student.id, {
        guide_id: mentor.id,
        guide_name: mentor.name,
        guide_rate: mentor.rate || '$45/hr'
      });
      onUpdateStudent(updatedStudent);
      showToast(`✅ You are now learning under Master Mentor: ${mentor.name}!`);
    } catch (err) {
      console.error('Error selecting mentor:', err);
      showToast('Failed to assign mentor. Please try again.');
    } finally {
      setMentorUpdateLoading(false);
    }
  };

  const completedCount = completedList.length;
  const progressPercent = Math.round((completedCount / TOUR_GUIDE_TUTORIALS.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-secondary pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium flex items-center gap-3 animate-fadeIn border border-white/10">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Student Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 group text-left focus:outline-none"
              title="Return to main website"
            >
              <BrandLogo badge="Student Portal" />
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-dark">{student.name}</div>
              <div className="text-[11px] text-gray-500">{student.email}</div>
            </div>

            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl text-xs font-medium text-dark hover:bg-gray-100 transition-colors border border-gray-200"
            >
              Main Site
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-red-50 text-danger hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Welcome & Progress Overview Banner */}
        <div className="bg-gradient-to-r from-[#181E4B] via-[#212832] to-[#2E3650] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/20 px-3 py-1 rounded-full">
                Accredited Guiding Curriculum
              </span>
              <h1 className="font-cursive text-2xl sm:text-4xl font-bold mt-3 mb-2 text-white">
                Welcome back, {student.name}!
              </h1>
              <p className="text-gray-300 text-sm max-w-xl font-normal">
                Follow your 6 structured masterclasses below to earn your tour guiding license. 
                Your progress is synced with the central admin platform.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-xs text-gray-300 font-medium">Completed Lessons</div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mt-1">
                  {completedCount} <span className="text-sm font-normal text-gray-400">/ {TOUR_GUIDE_TUTORIALS.length}</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-xs text-gray-300 font-medium">Assigned Instructor</div>
                <div className="text-base sm:text-lg font-bold text-white mt-1 truncate">
                  {student.guide_name || 'None Selected'}
                </div>
                <div className="text-xs text-danger font-semibold mt-2">
                  {student.guide_rate || 'Pick an instructor below'}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 1: Active Video Tutorial Player */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-danger uppercase tracking-wider mb-1">
                <span>Tutorial {activeTutorial.number}</span>
                <span>·</span>
                <span className="text-secondary">{activeTutorial.duration}</span>
                <span>·</span>
                <span className="bg-gray-100 text-dark px-2 py-0.5 rounded">{activeTutorial.level}</span>
              </div>
              <h2 className="font-cursive text-dark text-xl sm:text-2xl font-bold">
                {activeTutorial.title}
              </h2>
              <p className="text-secondary text-sm font-medium">{activeTutorial.subtitle}</p>
            </div>

            <button
              onClick={() => handleToggleComplete(activeTutorial.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
                completedList.includes(activeTutorial.id)
                  ? 'bg-success/15 text-success hover:bg-success/20 border border-success/30'
                  : 'bg-primary text-white hover:bg-primary-hover shadow-primary-btn'
              }`}
            >
              {completedList.includes(activeTutorial.id) ? (
                <>
                  <span>✓ Completed</span>
                  <span className="text-[10px] text-gray-500 font-normal">(Click to undo)</span>
                </>
              ) : (
                <>
                  <span>Mark as Completed</span>
                </>
              )}
            </button>
          </div>

          {/* Video Embed */}
          <div className="mt-6 aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeTutorial.videoId}?rel=0`}
              title={activeTutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Tutorial Notes & Takeaways */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
            <div className="md:col-span-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2">Lesson Overview</h4>
              <p className="text-secondary text-sm leading-relaxed">{activeTutorial.summary}</p>
            </div>
            <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2">Core Takeaways</h4>
              <ul className="space-y-1.5 text-xs text-secondary">
                {activeTutorial.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-success font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 2: All 6 Video Tutorials Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold">
                Complete Tour Guide Training Modules
              </h3>
              <p className="text-secondary text-sm font-medium">
                Watch all 6 tutorials to prepare for your live field mentoring session.
              </p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              6 Video Modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_GUIDE_TUTORIALS.map((tutorial) => {
              const isSelected = activeTutorial.id === tutorial.id;
              const isDone = completedList.includes(tutorial.id);

              return (
                <div
                  key={tutorial.id}
                  onClick={() => setActiveTutorial(tutorial)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-primary shadow-lg ring-2 ring-primary/20 transform -translate-y-1'
                      : 'bg-white border-gray-100 shadow-card hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-gray-100 text-secondary">
                        Lesson {tutorial.number}
                      </span>
                      {isDone ? (
                        <span className="text-xs font-bold text-success flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded-full">
                          ✓ Completed
                        </span>
                      ) : (
                        <span className="text-xs text-secondary">{tutorial.duration}</span>
                      )}
                    </div>

                    <h4 className="font-cursive text-dark text-lg font-bold mb-1 line-clamp-1">
                      {tutorial.title}
                    </h4>
                    <p className="text-danger text-xs font-semibold mb-3 line-clamp-1">
                      {tutorial.subtitle}
                    </p>
                    <p className="text-secondary text-xs line-clamp-2 leading-relaxed font-normal">
                      {tutorial.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-gray-500">{tutorial.level}</span>
                    <button
                      type="button"
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-dark hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? '▶ Currently Playing' : 'Watch Tutorial'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Choose Tutors / Mentors (Loaded from Backend) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Live Backend Database Mentors
              </div>
              <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold">
                Pick Your 1-on-1 Tour Guide Instructor
              </h3>
              <p className="text-secondary text-sm font-medium">
                Choose or switch your mentor at any time. When you select an instructor, your student record updates in the shared backend.
              </p>
            </div>

            {student.guide_name && (
              <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 text-left sm:text-right">
                <span className="text-[11px] text-secondary font-medium block">Current Assigned Mentor</span>
                <span className="font-bold text-dark text-sm">{student.guide_name}</span>
                <span className="text-xs text-primary font-bold ml-2">({student.guide_rate || '$45/hr'})</span>
              </div>
            )}
          </div>

          {loadingMentors ? (
            <div className="py-12 text-center text-secondary text-sm">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Loading accredited mentors from Supabase backend...
            </div>
          ) : mentors.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              No approved mentors currently active in the database. When tutors sign up and are approved by the admin in the sister project, they will appear here automatically.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, index) => {
                const isAssigned = student.guide_id === mentor.id;
                const imageSrc = mentor.picture
                  ? (mentor.picture.startsWith('http') || mentor.picture.startsWith('/') ? mentor.picture : `/${mentor.picture}`)
                  : `/assets/img/dest/dest${(index % 3) + 1}.jpg`;

                return (
                  <div
                    key={mentor.id}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                      isAssigned
                        ? 'bg-gradient-to-b from-amber-50/50 to-white border-primary shadow-md ring-2 ring-primary/20'
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={imageSrc}
                          alt={mentor.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `/assets/img/dest/dest${(index % 3) + 1}.jpg`;
                          }}
                        />
                        <div>
                          <h4 className="font-cursive text-dark text-base font-bold">{mentor.name}</h4>
                          <span className="text-xs text-secondary font-medium block">{mentor.location}</span>
                          <span className="text-xs font-bold text-primary">{mentor.rate || '$45/hr'}</span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-[#DF6951] uppercase tracking-wide mb-2">
                        {mentor.specialty}
                      </div>

                      {mentor.bio && (
                        <p className="text-secondary text-xs line-clamp-2 leading-relaxed mb-4">
                          {mentor.bio}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <span className="text-xs font-semibold text-dark">
                        {mentor.rating ? `★ ${mentor.rating}` : '★ 5.0'}
                      </span>

                      <button
                        type="button"
                        disabled={isAssigned || mentorUpdateLoading}
                        onClick={() => handleSelectMentor(mentor)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isAssigned
                            ? 'bg-success/15 text-success cursor-default border border-success/30'
                            : 'bg-dark text-white hover:bg-primary transition-colors shadow-sm'
                        }`}
                      >
                        {isAssigned ? '✓ Assigned Mentor' : 'Select as My Mentor'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 4: Student Details & Certification Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100">
          <h3 className="font-cursive text-dark text-xl sm:text-2xl font-bold mb-4">
            Student Enrollment Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-gray-50 p-3.5 rounded-xl">
              <span className="text-gray-400 block font-medium">Full Name</span>
              <span className="font-bold text-dark text-sm mt-0.5 block">{student.name}</span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl">
              <span className="text-gray-400 block font-medium">Email Address</span>
              <span className="font-bold text-dark text-sm mt-0.5 block truncate">{student.email}</span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl">
              <span className="text-gray-400 block font-medium">Phone Number</span>
              <span className="font-bold text-dark text-sm mt-0.5 block">{student.phone || '—'}</span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl">
              <span className="text-gray-400 block font-medium">Address / City</span>
              <span className="font-bold text-dark text-sm mt-0.5 block">{student.address || '—'}</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
