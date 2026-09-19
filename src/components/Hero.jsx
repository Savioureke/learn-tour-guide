import React, { useState } from 'react';
import { Search, MapPin, Compass, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function Hero({ onNavigate, onSearch }) {
  const [destination, setDestination] = useState('');
  const [tourType, setTourType] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, tourType });
    }
    if (onNavigate) {
      onNavigate('find-guides');
    }
  };

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger/10 text-danger text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Local Tour Guides &amp; Private Excursions</span>
            </div>
            
            <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-[60px] font-bold leading-[1.15] mb-5">
              Discover &amp; Book Top-Rated Local Tour Guides Worldwide
            </h1>
            
            <p className="text-secondary font-medium text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              Skip rigid bus groups. Connect directly with verified, licensed local guides for bespoke private walking tours, culinary adventures, and VIP museum skip-the-line excursions with transparent fixed rates.
            </p>

            {/* Interactive Traveler Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto md:mx-0 mb-6"
            >
              <div className="flex items-center gap-2.5 px-3 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-200">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to? (e.g. Rome, Paris, Kyoto)"
                  className="w-full text-xs sm:text-sm font-medium text-dark focus:outline-none placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 w-full sm:w-1/2">
                <Compass className="w-5 h-5 text-danger shrink-0" />
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium text-dark focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">All Excursion Types</option>
                  <option value="historical">Historical &amp; Ancient Landmarks</option>
                  <option value="culinary">Food &amp; Wine Walking Trails</option>
                  <option value="architecture">Architecture &amp; Art Museums</option>
                  <option value="safari">Eco-Adventures &amp; Wildlife</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl sm:rounded-full bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-primary-btn transition-all shrink-0 flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Find Guides</span>
              </button>
            </form>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs font-semibold text-secondary">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>4.95/5 Star Traveler Ratings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>100% Vetted Local Guides</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-primary font-bold">✓</span>
                <span>Pay Online or Cash in Person</span>
              </div>
            </div>

          </div>

          {/* Hero Illustration */}
          <div className="md:col-span-5 text-center md:text-right order-1 md:order-2">
            <div className="relative inline-block">
              <img
                src="/assets/img/hero/hero-img.png"
                alt="Certified Local Tour Guide Leading Travelers"
                className="w-full max-w-[480px] mx-auto md:max-w-none md:w-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
