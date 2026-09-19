import React from 'react';
import Hero from '../components/Hero';
import Mentors from '../components/Mentors';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { Compass, Users, ShieldCheck, CreditCard, DollarSign, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage({
  mentors = [],
  loadingMentors = false,
  onNavigate,
  onBookGuide
}) {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        onNavigate={onNavigate}
        onSearch={() => onNavigate('find-guides')}
      />

      {/* Booking Marketplace Pillars */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#FFF8F5]/60 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-danger bg-danger/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              The Booking Advantage
            </span>
            <h2 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              A Better Way to Experience Any Destination
            </h2>
            <p className="mt-4 text-secondary text-base sm:text-lg font-medium">
              We connect discerning travelers directly with vetted local guides for private excursions tailored exclusively to your interests.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF1DA] text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  100% Vetted Local Guides
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  Every guide in our directory is verified for licensing, field knowledge, and high traveler feedback ratings.
                </p>
                <ul className="space-y-2 mb-6 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Official local credentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Deep neighborhood secrets</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('find-guides')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-primary hover:text-white transition-all group-hover:shadow-md"
              >
                <span>Browse Guides</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  Transparent Fixed Rates
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  No awkward price bargaining or hidden tourist surcharges. All excursion fees and hourly rates are locked in upfront.
                </p>
                <ul className="space-y-2 mb-6 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Zero price haggling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Bundled package savings</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('instructors')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-danger hover:text-white transition-all group-hover:shadow-md"
              >
                <span>View Rates</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-info/15 text-info flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  Free 20-Min Discovery
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  Meet your guide via a complimentary 20-minute video or phone call to align on your custom wish list and itinerary.
                </p>
                <ul className="space-y-2 mb-6 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>100% risk-free planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Customizable routes</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('how-to-enroll')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-dark hover:text-white transition-all group-hover:shadow-md"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-success/15 text-success flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  Flexible Payments
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  Pay securely online via card or choose to pay cash in person directly to your guide upon arrival.
                </p>
                <ul className="space-y-2 mb-6 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Pay Online with protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Pay in Person on arrival</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('testimonials')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-success hover:text-white transition-all group-hover:shadow-md"
              >
                <span>Traveler Reviews</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Tour Guides Preview Section */}
      <Mentors
        mentors={mentors}
        loading={loadingMentors}
        onBookGuide={onBookGuide}
      />

      {/* Global Tourism Affiliates */}
      <Partners />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
