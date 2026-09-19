import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { Compass, GraduationCap } from 'lucide-react';

const NAV_HREFS = {
  home: '/',
  'find-guides': '/find-guides',
  instructors: '/top-guides',
  'how-to-enroll': '/how-to-book',
  testimonials: '/traveler-reviews',
  'trainee-portal': '/guide-academy'
};

export default function Navbar({
  currentPage = 'home',
  onNavigate,
  onOpenSignUp,
  onOpenLogin,
  currentStudent,
  onGoToDashboard,
  onLogout
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'find-guides', label: 'Find Guides' },
    { id: 'instructors', label: 'Featured Guides' },
    { id: 'how-to-enroll', label: 'How to Book' },
    { id: 'testimonials', label: 'Traveler Reviews' }
  ];

  const handleNavClick = (e, pageId) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5'
          : 'bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo -> Booking */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl cursor-pointer"
          title="Booking - Return to Home"
        >
          <BrandLogo badge="Tour Guides" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 sm:space-x-2 text-[15px] font-medium text-secondary">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'text-dark font-bold bg-gray-100/80 shadow-xs'
                : 'hover:text-dark hover:bg-gray-50'
            }`}
          >
            Home
          </a>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={NAV_HREFS[item.id] || `/${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-3.5 py-2 rounded-xl transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-primary font-bold bg-primary/10 shadow-xs'
                    : 'text-secondary hover:text-dark hover:bg-gray-50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-3">
          
          {/* Guide Academy / Trainee Link */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'trainee-portal')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentPage === 'trainee-portal'
                ? 'bg-dark text-white shadow-md'
                : 'bg-primary/10 text-dark hover:bg-primary/20'
            }`}
            title="Access the 10-Module Guide Training Academy"
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Become a Guide (Academy)</span>
          </button>

          {currentStudent ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onGoToDashboard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark text-white text-xs font-semibold hover:bg-primary transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span>My Portal ({currentStudent.name.split(' ')[0]})</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-medium text-danger hover:underline px-1"
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
                className="px-5 py-2.5 rounded-xl border border-dark text-dark font-semibold hover:bg-dark hover:text-white transition-all text-xs shadow-sm"
              >
                Sign Up
              </button>
            </>
          )}

          <div className="text-xs font-semibold text-secondary border-l pl-3 border-gray-300">
            EN
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-secondary hover:text-dark hover:bg-gray-100 transition-colors"
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
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-3 shadow-xl animate-fadeIn">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, 'home')}
            className={`block w-full text-left font-medium py-2 px-3 rounded-lg text-sm cursor-pointer ${
              currentPage === 'home' ? 'bg-primary/10 text-primary font-bold' : 'text-secondary hover:text-dark'
            }`}
          >
            Home
          </a>

          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={NAV_HREFS[item.id] || `/${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`block w-full text-left font-medium py-2 px-3 rounded-lg text-sm cursor-pointer ${
                  isActive ? 'bg-primary/10 text-primary font-bold' : 'text-secondary hover:text-dark'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'trainee-portal')}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-dark font-bold text-xs"
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Become a Guide (Academy)</span>
          </button>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {currentStudent ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoToDashboard();
                  }}
                  className="w-full py-3 text-center rounded-xl bg-dark text-white font-medium text-sm"
                >
                  My Dashboard ({currentStudent.name})
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
                  className="w-full py-2.5 text-center rounded-xl border border-gray-300 text-dark font-medium text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignUp();
                  }}
                  className="w-full py-3 text-center rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-primary-btn text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
