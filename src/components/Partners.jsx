import React from 'react';

const partners = [
  '/assets/img/partner/1.png',
  '/assets/img/partner/2.png',
  '/assets/img/partner/3.png',
  '/assets/img/partner/4.png',
  '/assets/img/partner/5.png',
];

export default function Partners() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase font-bold tracking-widest text-secondary/70">
            Recognized by Global Tourism Authorities & Travel Networks
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-hover-card transition-all duration-300 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 border border-gray-50"
            >
              <img src={partner} alt={`Partner Agency ${index + 1}`} className="h-10 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
