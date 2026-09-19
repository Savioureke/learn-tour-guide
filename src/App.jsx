import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import StudentDashboard from './components/StudentDashboard';

// Marketplace & Academy Pages
import HomePage from './pages/HomePage';
import FindGuidesPage from './pages/FindGuidesPage';
import HowToEnrollPage from './pages/HowToEnrollPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import TraineePortalPage from './pages/TraineePortalPage';

import { fetchTourGuides, updateStudentMentor } from './lib/supabase';

const SESSION_KEY = 'tourguide_student_session';

const PAGE_ROUTES = {
  home: '/',
  'find-guides': '/find-guides',
  instructors: '/top-guides',
  'how-to-enroll': '/how-to-book',
  testimonials: '/traveler-reviews',
  'trainee-portal': '/guide-academy'
};

const PAGE_TITLES = {
  home: 'Booking | Certified Local Tour Guides & Bespoke Excursions',
  'find-guides': 'Find Tour Guides | Booking Marketplace',
  instructors: 'Top Rated Tour Guides | Booking Marketplace',
  'how-to-enroll': 'How to Book a Guide | Booking Marketplace',
  testimonials: 'Traveler Reviews & Experiences | Booking Marketplace',
  'trainee-portal': 'Trainee Tour Guide Academy (10 Modules) | Booking'
};

function getInitialPage() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace('#', '');

  if (path === '/find-guides' || path === '/curriculum' || hash === 'find-guides' || hash === 'curriculum') return 'find-guides';
  if (path === '/top-guides' || path === '/instructors' || hash === 'instructors' || hash === 'mentors') return 'instructors';
  if (path === '/how-to-book' || path === '/how-to-enroll' || hash === 'how-to-enroll' || hash === 'how-to-start') return 'how-to-enroll';
  if (path === '/traveler-reviews' || path === '/success-stories' || path === '/testimonials' || hash === 'testimonials') return 'testimonials';
  if (path === '/guide-academy' || path === '/trainee-portal' || hash === 'trainee-portal' || hash === 'academy') return 'trainee-portal';
  
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

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedGuideForBooking, setSelectedGuideForBooking] = useState(null);

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

  const handleOpenBooking = (guide) => {
    setSelectedGuideForBooking(guide);
    setBookingModalOpen(true);
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
      case 'find-guides':
      case 'instructors':
        return (
          <FindGuidesPage
            mentors={mentors}
            onBookGuide={handleOpenBooking}
          />
        );
      case 'how-to-enroll':
        return (
          <HowToEnrollPage
            onNavigate={handleNavigate}
          />
        );
      case 'testimonials':
        return (
          <SuccessStoriesPage
            onNavigate={handleNavigate}
          />
        );
      case 'trainee-portal':
        return (
          <TraineePortalPage
            currentStudent={currentStudent}
            onNavigate={handleNavigate}
            onOpenSignUp={handleOpenSignUp}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            mentors={mentors}
            loadingMentors={loadingMentors}
            onNavigate={handleNavigate}
            onBookGuide={handleOpenBooking}
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

      {/* Traveler Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        guide={selectedGuideForBooking}
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
