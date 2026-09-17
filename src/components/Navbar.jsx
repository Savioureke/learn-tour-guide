import React, { useState, useEffect } from 'react';

export default function Navbar({
  onOpenSignUp,
  onOpenLogin,
  onOpenVideo,
  currentStudent,
  onGoToDashboard,
  onLogout
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 group">
          <img src="/assets/img/logo.svg" height="34" alt="TourGuide Academy Logo" className="h-8 md:h-9" />
          <span className="text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#DF6951]/10 text-danger">
            Academy
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-secondary">
          <a href="#curriculum" className="hover:text-dark transition-colors">
            Curriculum
          </a>
          <a href="#mentors" className="hover:text-dark transition-colors">
            Instructors
          </a>
          <a href="#how-to-start" className="hover:text-dark transition-colors">
            How to Enroll
          </a>
          <a href="#testimonials" className="hover:text-dark transition-colors">
            Success Stories
          </a>
          <button
            type="button"
            onClick={onOpenVideo}
            className="hover:text-danger flex items-center gap-1.5 transition-colors font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
            Intro Video
          </button>
        </div>

        {/* Auth / Student Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {currentStudent ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onGoToDashboard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark text-white text-xs font-semibold hover:bg-primary transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span>My Dashboard ({currentStudent.name.split(' ')[0]})</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-medium text-danger hover:underline px-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpenLogin}
                className="text-[15px] font-medium text-secondary hover:text-dark transition-colors px-2 py-1"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onOpenSignUp()}
                className="px-6 py-2.5 rounded-lg border border-dark text-dark font-medium hover:bg-dark hover:text-white transition-all text-sm shadow-sm"
              >
                Sign Up
              </button>
            </>
          )}

          <div className="text-xs font-medium text-secondary border-l pl-3 border-gray-300">
            EN
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-secondary hover:text-dark hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-4 shadow-lg animate-fadeIn">
          <a
            href="#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-secondary hover:text-dark font-medium py-1"
          >
            Curriculum
          </a>
          <a
            href="#mentors"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-secondary hover:text-dark font-medium py-1"
          >
            Instructors
          </a>
          <a
            href="#how-to-start"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-secondary hover:text-dark font-medium py-1"
          >
            How to Enroll
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-secondary hover:text-dark font-medium py-1"
          >
            Success Stories
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVideo();
            }}
            className="block text-danger font-medium py-1 text-left w-full"
          >
            Watch Intro Video
          </button>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {currentStudent ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoToDashboard();
                  }}
                  className="w-full py-3 text-center rounded-lg bg-dark text-white font-medium text-sm"
                >
                  Go to Student Dashboard ({currentStudent.name})
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-center text-danger text-xs font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 text-center rounded-lg border border-gray-300 text-dark font-medium text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignUp();
                  }}
                  className="w-full py-3 text-center rounded-lg bg-primary text-white font-medium hover:bg-primary-hover shadow-primary-btn text-sm"
                >
                  Sign Up &amp; Enroll
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
