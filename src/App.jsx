import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import Mentors from './components/Mentors';
import EnrollmentSteps from './components/EnrollmentSteps';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import VideoModal from './components/VideoModal';
import StudentDashboard from './components/StudentDashboard';
import { fetchTourGuides, updateStudentMentor } from './lib/supabase';

const SESSION_KEY = 'tourguide_student_session';

export default function App() {
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Auth & Student State
  const [currentStudent, setCurrentStudent] = useState(null);
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'dashboard'
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

  // Fetch active tour guides from the Supabase backend
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
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.warn('Failed to remove session:', e);
    }
    setViewMode('home');
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
        onBackToHome={() => setViewMode('home')}
        onUpdateStudent={handleUpdateStudent}
      />
    );
  }

  // Otherwise show main marketing website
  return (
    <div className="min-h-screen bg-[#FFFEFE] text-secondary selection:bg-primary selection:text-white" id="top">
      {/* Navigation */}
      <Navbar
        onOpenSignUp={() => handleOpenSignUp(null)}
        onOpenLogin={handleOpenLogin}
        onOpenVideo={() => setIsVideoOpen(true)}
        currentStudent={currentStudent}
        onGoToDashboard={() => setViewMode('dashboard')}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenEnroll={() => (currentStudent ? setViewMode('dashboard') : handleOpenSignUp(null))}
          onOpenVideo={() => setIsVideoOpen(true)}
        />

        {/* Curriculum / Modules */}
        <Curriculum />

        {/* Live Mentors from Supabase */}
        <Mentors
          mentors={mentors}
          loading={loadingMentors}
          onSelectMentor={handleSelectMentorFromWebsite}
        />

        {/* 3 Step Pathway & Live Status Card */}
        <EnrollmentSteps
          onOpenEnroll={() => (currentStudent ? setViewMode('dashboard') : handleOpenSignUp(null))}
        />

        {/* Testimonials */}
        <Testimonials />

        {/* Global Tourism Affiliates */}
        <Partners />

        {/* Newsletter CTA */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer
        onOpenEnroll={() => (currentStudent ? setViewMode('dashboard') : handleOpenSignUp(null))}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        mentors={mentors}
        preselectedMentor={preselectedMentor}
        onAuthSuccess={handleAuthSuccess}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
