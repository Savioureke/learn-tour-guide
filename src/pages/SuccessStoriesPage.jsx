import React from 'react';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { Star, Globe, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function SuccessStoriesPage({ onNavigate }) {
  const reviews = [
    {
      author: 'David & Sarah Miller',
      city: 'Booked in Rome, Italy',
      guide: 'Mateo Rossi',
      tour: 'Ancient Roman History & Colosseum Underground',
      rating: 5,
      date: 'September 2026',
      review: 'Booking Mateo was the best decision of our entire 2-week Europe trip. He brought the Colosseum to life with incredible stories and bypassed all the brutal crowds. The Pay in Person option made everything effortless!'
    },
    {
      author: 'Caroline Dupont',
      city: 'Booked in Paris, France',
      guide: 'Sophia Laurent',
      tour: 'Louvre Masterpieces & Secret Marais Pastry Walk',
      rating: 5,
      date: 'August 2026',
      review: 'We took advantage of Sophia’s 20-minute free discovery call to plan an art and food tour for our family. She was warm, deeply knowledgeable, and our kids were captivated the entire morning.'
    },
    {
      author: 'Marcus Vance',
      city: 'Booked in Kyoto, Japan',
      guide: 'Kenji Tanaka',
      tour: 'Zen Temples, Tea Rituals & Gion Evening Walk',
      rating: 5,
      date: 'September 2026',
      review: 'Kenji showed us tranquil bamboo groves and hidden shrines far away from tourist buses. Having an accredited private guide made our trip unforgettable. Highly recommend booking early!'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-success/15 text-success text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-4 h-4 fill-success" />
            Verified Traveler Experiences
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            What Travelers Say About Our Guides
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Read genuine reviews and memorable moments from travelers who booked private walking tours and custom excursions worldwide.
          </p>

          {/* Stats Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">4.95 ★</div>
              <div className="text-xs text-secondary font-medium mt-1">Average Guide Rating</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark">12,500+</div>
              <div className="text-xs text-secondary font-medium mt-1">Private Tours Delivered</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-danger">40+</div>
              <div className="text-xs text-secondary font-medium mt-1">World Destinations</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-success">99.2%</div>
              <div className="text-xs text-secondary font-medium mt-1">Positive Traveler Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Testimonial Slider */}
      <Testimonials />

      {/* Detailed Traveler Reviews Grid */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Recent Verified Excursions
            </h2>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl font-bold">
              Unfiltered Feedback from Real Trips
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">{r.date}</span>
                  </div>

                  <p className="text-secondary text-xs sm:text-sm italic leading-relaxed font-medium mb-6">
                    "{r.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="font-bold text-sm text-dark">{r.author}</div>
                  <div className="text-xs text-primary font-semibold mt-0.5">{r.tour}</div>
                  <div className="text-[11px] text-secondary font-medium mt-0.5">{r.city} &middot; Guide: {r.guide}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('find-guides')}
              className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover shadow-primary-btn transition-all inline-flex items-center gap-2"
            >
              <span>Find a Guide for Your Next Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Partners />
      <Newsletter />
    </div>
  );
}
