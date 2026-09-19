import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { BookOpen, Users, Compass, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage({
  onNavigate,
  onOpenEnroll,
  currentStudent,
  onGoToDashboard
}) {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        onOpenEnroll={() => (currentStudent ? onGoToDashboard() : onOpenEnroll(null))}
        onNavigate={onNavigate}
      />

      {/* Academy Pillars Overview Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#FFF8F5]/60 to-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-danger bg-danger/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Explore Our Program
            </span>
            <h2 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Everything You Need to Succeed as an International Guide
            </h2>
            <p className="mt-4 text-secondary text-base sm:text-lg font-medium">
              Explore our four dedicated academy pillars designed to take you from passionate traveler to licensed, highly paid professional.
            </p>
          </div>

          {/* 4 Cards Grid linking to dedicated pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Curriculum */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF1DA] text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  Comprehensive Curriculum
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  4 core modules covering high-impact storytelling, crowd psychology, cultural interpretation, and tour business pricing.
                </p>
                <ul className="space-y-2 mb-8 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Storytelling & Narratives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Group Safety & Logistics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Business & Hourly Rates</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('curriculum')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-primary hover:text-white transition-all group-hover:shadow-md"
              >
                <span>Explore Curriculum</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: Instructors */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  Master Mentors
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  Connect 1-on-1 with licensed, veteran tour guides across Europe, Asia, and the Americas for personalized field coaching.
                </p>
                <ul className="space-y-2 mb-8 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Live Supabase Directory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>5-Star Rated Practitioners</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Custom 1-on-1 Coaching</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('instructors')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-danger hover:text-white transition-all group-hover:shadow-md"
              >
                <span>Meet Instructors</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: How to Enroll */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-info/15 text-info flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  How to Enroll
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  A clear, 3-step pathway from mentor selection to verified student profile registration and dashboard graduation.
                </p>
                <ul className="space-y-2 mb-8 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Instant Profile Activation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Zero Complex Paperwork</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Live Central Database Sync</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('how-to-enroll')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-dark hover:text-white transition-all group-hover:shadow-md"
              >
                <span>View Enrollment Steps</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 4: Success Stories */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-success/15 text-success flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-cursive text-dark text-2xl font-bold mb-3">
                  Success Stories
                </h3>
                <p className="text-secondary text-sm leading-relaxed font-medium mb-6">
                  Read authentic feedback and career transformations from graduates currently guiding tours in top destinations worldwide.
                </p>
                <ul className="space-y-2 mb-8 text-xs font-semibold text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Alumni in 40+ Countries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>$45 - $90/hr Average Rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>98% Student Satisfaction</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('testimonials')}
                className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 text-dark font-semibold text-sm hover:bg-success hover:text-white transition-all group-hover:shadow-md"
              >
                <span>Read Success Stories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Quick CTA strip */}
          <div className="mt-16 bg-gradient-to-r from-dark via-[#232940] to-dark rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/20 px-3 py-1 rounded-full inline-block mb-3">
                Join Today
              </span>
              <h3 className="font-cursive text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Ready to Start Your Tour Guiding Journey?
              </h3>
              <p className="text-gray-300 text-sm sm:text-base font-normal max-w-xl">
                Create your student account in under 2 minutes and unlock immediate access to your personalized training dashboard and master tutorials.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <button
                onClick={() => (currentStudent ? onGoToDashboard() : onOpenEnroll(null))}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-semibold text-sm shadow-primary-btn hover:bg-primary-hover transition-all transform hover:-translate-y-0.5"
              >
                {currentStudent ? 'Go to My Dashboard' : 'Enroll in Academy Now'}
              </button>
              <button
                onClick={() => onNavigate('curriculum')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20"
              >
                Explore Modules
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Global Tourism Affiliates */}
      <Partners />

      {/* Newsletter CTA */}
      <Newsletter />
    </div>
  );
}
