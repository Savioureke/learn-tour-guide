import React, { useState } from 'react';

const testimonials = [
  {
    author: 'Mateo Silva',
    location: 'Rome & Florence, Italy',
    image: '/assets/img/testimonial/author.png',
    text: 'The 1-on-1 mentorship completely transformed my career. Learning how to pace historical narratives and handle VIP travelers allowed me to secure exclusive walking tour contracts across the Vatican and Colosseum within weeks of graduating.'
  },
  {
    author: 'Sophie Laurent',
    location: 'Paris & Versailles, France',
    image: '/assets/img/testimonial/author2.png',
    text: 'Learning directly from active master guides gave me practical field confidence no textbook could match. The business module helped me package private museum experiences at $65/hr with repeat bookings.'
  },
  {
    author: 'Kenji Tanaka',
    location: 'Kyoto, Japan',
    image: '/assets/img/testimonial/author3.png',
    text: 'From crowd safety to intercultural communication, every drill in the academy was gold. Today I lead sold-out bespoke tea ceremony and temple tours with 5-star international ratings.'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Heading & Indicator Dots */}
          <div className="lg:col-span-5 text-left">
            <h5 className="text-secondary font-semibold text-base sm:text-lg uppercase tracking-wider mb-2">
              Testimonials
            </h5>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-[46px] font-bold leading-tight mb-8">
              What Our Certified Graduates Say
            </h3>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-dark scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right: Stacked Cards & Navigation */}
          <div className="lg:col-span-6 relative flex items-center justify-between">
            <div className="relative w-full max-w-lg">
              
              {/* Ghost card behind */}
              <div 
                className="absolute inset-0 bg-white/70 border border-gray-100 rounded-3xl shadow-sm transform translate-x-6 translate-y-6 -z-10"
              />

              {/* Foreground card */}
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-gray-100">
                {/* Author Avatar overlapping top-left */}
                <div className="absolute -top-7 -left-5">
                  <img
                    src={current.image}
                    alt={current.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                <p className="text-secondary text-sm sm:text-base font-medium leading-relaxed mb-6 pt-2">
                  &ldquo;{current.text}&rdquo;
                </p>

                <div>
                  <h5 className="font-cursive text-dark text-lg font-bold">
                    {current.author}
                  </h5>
                  <p className="text-secondary text-xs font-semibold uppercase tracking-wider text-danger mt-0.5">
                    {current.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Up / Down Navigation Controls */}
            <div className="flex flex-col gap-4 ml-6">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm hover:shadow transition-all"
                aria-label="Previous testimonial"
              >
                <img src="/assets/img/icons/up.svg" width="14" alt="Up" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center shadow-sm hover:shadow transition-all"
                aria-label="Next testimonial"
              >
                <img src="/assets/img/icons/down.svg" width="14" alt="Down" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
