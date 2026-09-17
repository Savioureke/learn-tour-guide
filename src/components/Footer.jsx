import React from 'react';

export default function Footer({ onOpenEnroll }) {
  return (
    <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/img/logo2.svg" width="140" alt="TourGuide Academy" />
              <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/15 text-primary">
                Academy
              </span>
            </div>
            <p className="text-secondary text-sm leading-relaxed max-w-sm font-medium">
              Empowering the next generation of world-class tour guides, storytellers, and travel entrepreneurs across the globe.
            </p>
          </div>

          {/* Nav Column 1: Curriculum */}
          <div className="lg:col-span-2">
            <h4 className="text-dark font-bold text-base mb-4">Academy</h4>
            <ul className="space-y-2.5 text-sm text-secondary font-medium">
              <li><a href="#curriculum" className="hover:text-dark transition-colors">Curriculum</a></li>
              <li><a href="#mentors" className="hover:text-dark transition-colors">Master Mentors</a></li>
              <li><a href="#how-to-start" className="hover:text-dark transition-colors">How to Enroll</a></li>
              <li><a href="#testimonials" className="hover:text-dark transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Nav Column 2: Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-dark font-bold text-base mb-4">Certification</h4>
            <ul className="space-y-2.5 text-sm text-secondary font-medium">
              <li><a href="#!" onClick={(e) => { e.preventDefault(); onOpenEnroll(); }} className="hover:text-dark transition-colors">Student Portal</a></li>
              <li><a href="#!" className="hover:text-dark transition-colors">License Standards</a></li>
              <li><a href="#!" className="hover:text-dark transition-colors">VIP Field Drills</a></li>
              <li><a href="#!" className="hover:text-dark transition-colors">Tour Rates Guide</a></li>
            </ul>
          </div>

          {/* Nav Column 3: Contact & Admin Sync */}
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
          <span>All rights reserved &copy; {new Date().getFullYear()} TourGuide Academy &middot; Connected with Central Supabase Tour Network</span>
          <span className="text-gray-400">Ready for Vercel &amp; GitHub Deployment</span>
        </div>
      </div>
    </footer>
  );
}
