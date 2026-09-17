import React from 'react';

export default function Hero({ onOpenEnroll, onOpenVideo }) {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden">
      {/* Background Graphic */}
      <div 
        className="absolute top-0 right-0 w-full md:w-[65%] h-[800px] bg-no-repeat bg-right-top pointer-events-none -z-10"
        style={{ backgroundImage: "url('/assets/img/hero/hero-bg.svg')" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="md:col-span-7 text-center md:text-left order-2 md:order-1">
            <h4 className="text-danger font-bold uppercase text-sm sm:text-base tracking-widest mb-3">
              Become a Certified Professional Tour Guide
            </h4>
            
            <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-[62px] font-bold leading-[1.15] mb-6">
              Master the Art of Tour Guiding & Inspire Global Travelers
            </h1>
            
            <p className="text-secondary font-medium text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              Turn your passion for culture, heritage, and exploration into an international career. 
              Learn directly from top-rated licensed guides, master captivating storytelling, 
              and build your own high-earning private tour clientele.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
              <button
                type="button"
                onClick={() => onOpenEnroll()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-medium text-base shadow-primary-btn hover:bg-primary-hover transition-all transform hover:-translate-y-0.5"
              >
                Enroll in Academy
              </button>

              <button
                type="button"
                onClick={onOpenVideo}
                className="group flex items-center gap-3 text-secondary hover:text-dark transition-colors py-2"
              >
                <span className="w-12 h-12 rounded-full bg-danger text-white flex items-center justify-center danger-btn-shadow group-hover:scale-105 transition-transform">
                  <img src="/assets/img/hero/play.svg" width="14" alt="Play Intro Video" />
                </span>
                <span className="font-medium text-[15px]">Watch Intro Video</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="md:col-span-5 text-center md:text-right order-1 md:order-2">
            <div className="relative inline-block">
              <img
                src="/assets/img/hero/hero-img.png"
                alt="Tour Guide Professional Instructor"
                className="w-full max-w-[480px] mx-auto md:max-w-none md:w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
