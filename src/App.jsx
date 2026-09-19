import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import StudentDashboard from './components/StudentDashboard';

// Dedicated Pages
import HomePage from './pages/HomePage';
import CurriculumPage from './pages/CurriculumPage';
import InstructorsPage from './pages/InstructorsPage';
import HowToEnrollPage from './pages/HowToEnrollPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';

import { fetchTourGuides, updateStudentMentor } from './lib/supabase';

const SESSION_KEY = 'tourguide_student_session';

const PAGE_ROUTES = {
  home: '/',
  curriculum: '/curriculum',
  instructors: '/instructors',
  'how-to-enroll': '/how-to-enroll',
  testimonials: '/success-stories'
};

const PAGE_TITLES = {
  home: 'Learn Tour Guide | Professional Tour Guide Certification & Academy',
  curriculum: 'Curriculum | Learn Tour Guide Academy',
  instructors: 'Instructors & Mentors | Learn Tour Guide Academy',
  'how-to-enroll': 'How to Enroll | Learn Tour Guide Academy',
  testimonials: 'Success Stories | Learn Tour Guide Academy'
};

function getInitialPage() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace('#', '');

  if (path === '/curriculum' || hash === 'curriculum') return 'curriculum';
  if (path === '/instructors' || hash === 'instructors' || hash === 'mentors') return 'instructors';
  if (path === '/how-to-enroll' || hash === 'how-to-enroll' || hash === 'how-to-start') return 'how-to-enroll';
  if (path === '/success-stories' || path === '/testimonials' || hash === 'testimonials') return 'testimonials';
  
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  
  // Auth & Student State
  const [currentStudent, setCurrentStudent] = useState(null);
  const [viewMode, setViewMode] = useState('main'); // 'main' | 'dashboard'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup'); // 'signup' | 'login'
  const [preselectedMentor, setPreselectedMentor] = useState(null);

  // Restore saved student session on launch
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY);
      if (savedSession) {
        const student = JSON.parse(savedSession);
        setCurrentStudent(student);
      }
    } catch (e) {
      console.warn('Could not parse student session:', e);
    }
  }, []);

  // Handle browser Back & Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title when page changes
  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
  }, [currentPage]);

  // Fetch active tour guides from Supabase backend
  useEffect(() => {
    async function loadGuides() {
      try {
        setLoadingMentors(true);
        const data = await fetchTourGuides();
        setMentors(data);
      } catch (err) {
        console.error('Failed to load tour guide instructors:', err);
      } finally {
        setLoadingMentors(false);
      }
    }
    loadGuides();
  }, []);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    setViewMode('main');
    const targetUrl = PAGE_ROUTES[pageId] || '/';
    try {
      window.history.pushState({ page: pageId }, '', targetUrl);
    } catch (e) {
      console.warn('History pushState error:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSignUp = (mentor = null) => {
    setPreselectedMentor(mentor);
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (student) => {
    setCurrentStudent(student);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(student));
    } catch (e) {
      console.warn('Failed to save session:', e);
    }
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.warn('Failed to remove session:', e);
    }
    setViewMode('main');
  };

  const handleUpdateStudent = (updatedStudent) => {
    setCurrentStudent(updatedStudent);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedStudent));
    } catch (e) {
      console.warn('Failed to update session:', e);
    }
  };

  const handleSelectMentorFromWebsite = async (mentor) => {
    if (currentStudent) {
      try {
        const updated = await updateStudentMentor(currentStudent.id, {
          guide_id: mentor.id,
          guide_name: mentor.name,
          guide_rate: mentor.rate || '$45/hr'
        });
        handleUpdateStudent(updated);
        setViewMode('dashboard');
      } catch (err) {
        console.error('Failed to assign mentor:', err);
        setViewMode('dashboard');
      }
    } else {
      handleOpenSignUp(mentor);
    }
  };

  // If in dashboard view and student is logged in, show student dashboard
  if (viewMode === 'dashboard' && currentStudent) {
    return (
      <StudentDashboard
        student={currentStudent}
        onLogout={handleLogout}
        onBackToHome={() => {
          setViewMode('main');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onUpdateStudent={handleUpdateStudent}
      />
    );
  }

  // Render current dedicated page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'curriculum':
        return (
          <CurriculumPage
            onOpenEnroll={handleOpenSignUp}
            onNavigate={handleNavigate}
            currentStudent={currentStudent}
            onGoToDashboard={() => setViewMode('dashboard')}
          />
        );
      case 'instructors':
        return (
          <InstructorsPage
            mentors={mentors}
            loadingMentors={loadingMentors}
            onSelectMentor={handleSelectMentorFromWebsite}
            onOpenEnroll={handleOpenSignUp}
            onNavigate={handleNavigate}
            currentStudent={currentStudent}
            onGoToDashboard={() => setViewMode('dashboard')}
          />
        );
      case 'how-to-enroll':
        return (
          <HowToEnrollPage
            onOpenEnroll={handleOpenSignUp}
            onNavigate={handleNavigate}
            currentStudent={currentStudent}
            onGoToDashboard={() => setViewMode('dashboard')}
          />
        );
      case 'testimonials':
        return (
          <SuccessStoriesPage
            onOpenEnroll={handleOpenSignUp}
            onNavigate={handleNavigate}
            currentStudent={currentStudent}
            onGoToDashboard={() => setViewMode('dashboard')}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnroll={handleOpenSignUp}
            currentStudent={currentStudent}
            onGoToDashboard={() => setViewMode('dashboard')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEFE] text-secondary selection:bg-primary selection:text-white" id="top">
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSignUp={() => handleOpenSignUp(null)}
        onOpenLogin={handleOpenLogin}
        currentStudent={currentStudent}
        onGoToDashboard={() => setViewMode('dashboard')}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main>
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        onOpenEnroll={() => (currentStudent ? setViewMode('dashboard') : handleOpenSignUp(null))}
        onNavigate={handleNavigate}
      />

      {/* Auth & Enrollment Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        mentors={mentors}
        preselectedMentor={preselectedMentor}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
