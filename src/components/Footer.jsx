import React from 'react';
import BrandLogo from './BrandLogo';

export default function Footer({ onOpenEnroll, onNavigate }) {
  const handleNavClick = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-left mb-4 focus:outline-none"
            >
              <BrandLogo />
            </button>
            <p className="text-secondary text-sm leading-relaxed max-w-sm font-medium">
              Empowering the next generation of world-class tour guides, storytellers, and travel entrepreneurs across the globe.
            </p>
          </div>

          {/* Nav Column 1: Academy Pages */}
          <div className="lg:col-span-2">
            <h4 className="text-dark font-bold text-base mb-4">Academy</h4>
            <ul className="space-y-2.5 text-sm text-secondary font-medium">
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'curriculum')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Curriculum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'instructors')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Master Mentors
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'how-to-enroll')}
                  className="hover:text-dark transition-colors text-left"
                >
                  How to Enroll
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'testimonials')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Resources & Certification */}
          <div className="lg:col-span-2">
            <h4 className="text-dark font-bold text-base mb-4">Certification</h4>
            <ul className="space-y-2.5 text-sm text-secondary font-medium">
              <li>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); onOpenEnroll(); }}
                  className="hover:text-dark transition-colors text-left text-primary font-semibold"
                >
                  Student Portal &amp; Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'curriculum')}
                  className="hover:text-dark transition-colors text-left"
                >
                  License Standards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'instructors')}
                  className="hover:text-dark transition-colors text-left"
                >
                  VIP Field Drills
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'curriculum')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Tour Rates Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Contact & Social */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <a 
                href="#!" 
                className="w-10 h-10 rounded-full bg-white shadow-social border border-gray-100 flex items-center justify-center text-dark hover:text-danger hover:scale-110 transition-all text-xs font-bold"
              >
                FB
              </a>
              <a 
                href="#!" 
                className="w-10 h-10 rounded-full bg-white shadow-social border border-gray-100 flex items-center justify-center text-dark hover:text-danger hover:scale-110 transition-all text-xs font-bold"
              >
                IG
              </a>
              <a 
                href="#!" 
                className="w-10 h-10 rounded-full bg-white shadow-social border border-gray-100 flex items-center justify-center text-dark hover:text-danger hover:scale-110 transition-all text-xs font-bold"
              >
                TW
              </a>
            </div>

            <h4 className="text-secondary text-sm font-semibold mb-3">Download Field Guide Mobile App</h4>
            <div className="flex items-center gap-3">
              <a href="#!" className="hover:opacity-90 transition-opacity">
                <img src="/assets/img/play-store.png" alt="Get on Google Play" className="h-9" />
              </a>
              <a href="#!" className="hover:opacity-90 transition-opacity">
                <img src="/assets/img/apple-store.png" alt="Get on Apple App Store" className="h-9" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs text-secondary font-medium flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>All rights reserved &copy; {new Date().getFullYear()} Learn Tour Guide Academy &middot; Connected with Central Supabase Tour Network</span>
          <span className="text-gray-400">Ready for Vercel &amp; GitHub Deployment</span>
        </div>
      </div>
    </footer>
  );
}
