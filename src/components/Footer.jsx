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
              <BrandLogo badge="Tour Guides" />
            </button>
            <p className="text-secondary text-sm leading-relaxed max-w-sm font-medium">
              Connecting travelers directly with vetted local tour guides for authentic private excursions, museum skip-the-line walks, and culinary trails worldwide.
            </p>
          </div>

          {/* Nav Column 1: Traveler Booking */}
          <div className="lg:col-span-2">
            <h4 className="text-dark font-bold text-base mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm text-secondary font-medium">
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'find-guides')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Find Guides
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'instructors')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Featured Guides
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'how-to-enroll')}
                  className="hover:text-dark transition-colors text-left"
                >
                  How to Book
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'testimonials')}
                  className="hover:text-dark transition-colors text-left"
                >
                  Traveler Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Traveler Assurance */}
          <div className="lg:col-span-2">
            <h4 className="text-dark font-bold text-base mb-4">Traveler Trust</h4>
            <ul className="space-y-2.5 text-sm text-secondary font-medium">
              <li className="flex items-center gap-1.5 text-dark">
                <span>✓ Verified Local Guides</span>
              </li>
              <li className="flex items-center gap-1.5 text-dark">
                <span>✓ Free 20-Min Discovery</span>
              </li>
              <li className="flex items-center gap-1.5 text-dark">
                <span>✓ Fixed Transparent Rates</span>
              </li>
              <li className="flex items-center gap-1.5 text-dark">
                <span>✓ Pay Online or In Person</span>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Social & Mobile Apps */}
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

            <h4 className="text-secondary text-sm font-semibold mb-3">Download Booking Mobile App</h4>
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
          <span>All rights reserved &copy; {new Date().getFullYear()} Booking &middot; Certified Tour Guides &amp; Bespoke Excursions Marketplace</span>
          <span className="text-gray-400">Connected with Central Supabase Cloud Network</span>
        </div>
      </div>
    </footer>
  );
}
