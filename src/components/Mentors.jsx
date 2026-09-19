import React from 'react';
import { MapPin, Calendar, Clock, Star, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

export default function Mentors({ mentors = [], loading = false, onBookGuide }) {
  const fallbackAvatars = [
    '/assets/img/instructors/sophia.jpg',
    '/assets/img/instructors/mateo.jpg',
    '/assets/img/instructors/carlos.jpg',
    '/assets/img/instructors/kenji.jpg'
  ];

  return (
    <section id="guides" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background shape */}
      <div className="absolute right-6 bottom-4 pointer-events-none -z-10 hidden xl:block">
        <img src="/assets/img/dest/shape.svg" alt="Decorative shape" className="w-24 opacity-75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Verified Local Experts Available Now
          </div>
          <h5 className="text-secondary font-semibold text-base sm:text-lg uppercase tracking-wider mb-2">
            Top-Rated Tour Guides
          </h5>
          <h3 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">
            Book Certified Private Guides
          </h3>
          <p className="mt-3 text-secondary text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Explore authentic cultures with dedicated local insiders. Enjoy transparent fixed pricing, optional 20-minute discovery consultations, and flexible in-person or online payment.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-secondary text-sm font-medium">Loading verified guides from database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((guide, index) => {
              const defaultAvatar = fallbackAvatars[index % fallbackAvatars.length];
              const imageSrc = guide.picture 
                ? (guide.picture.startsWith('http') || guide.picture.startsWith('/') ? guide.picture : `/${guide.picture}`)
                : defaultAvatar;

              return (
                <div
                  key={guide.id || index}
                  className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col border border-gray-100/80 group"
                >
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                    <img
                      src={imageSrc}
                      alt={guide.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatar;
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-dark shadow-sm flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{guide.rating || '5.0'}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-success" />
                      <span>Verified Licensed Guide</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Rate */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-cursive text-dark text-xl sm:text-2xl font-bold">
                          {guide.name}
                        </h4>
                        <span className="text-sm font-bold text-danger whitespace-nowrap">
                          {guide.rate || '$45/hr'}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-secondary text-xs font-medium mb-3">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{guide.location}</span>
                      </div>

                      {/* Specialty */}
                      <div className="text-xs font-semibold uppercase tracking-wider text-dark bg-gray-50 p-2.5 rounded-xl border border-gray-100 mb-3">
                        <span className="text-primary mr-1">Specialty:</span>
                        {guide.specialty || 'Historical Walking & Cultural Excursions'}
                      </div>

                      {/* Bio */}
                      <p className="text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
                        {guide.bio || 'Experienced certified local guide dedicated to revealing hidden quarters, local traditions, and unforgettable landmark insights.'}
                      </p>

                      {/* Tour Formats Offered */}
                      <div className="flex flex-wrap gap-1.5 mb-5 text-[11px] font-semibold text-secondary">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-dark">
                          Half Day
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-dark">
                          Full Day
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-success/10 text-success">
                          20-Min Free Discovery
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onBookGuide(guide)}
                        className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-primary-btn transition-all text-center"
                      >
                        Book Guide
                      </button>
                      <button
                        type="button"
                        onClick={() => onBookGuide(guide)}
                        className="p-3 rounded-xl border border-gray-200 text-dark hover:bg-gray-50 transition-colors"
                        title="Free Discovery Call"
                      >
                        <MessageCircle className="w-4 h-4 text-primary" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
