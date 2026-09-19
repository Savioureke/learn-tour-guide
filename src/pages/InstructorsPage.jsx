import React from 'react';
import Mentors from '../components/Mentors';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { ShieldCheck, Video, MessageSquare, Star, ArrowRight } from 'lucide-react';

export default function InstructorsPage({
  mentors,
  loadingMentors,
  onSelectMentor,
  onOpenEnroll,
  onNavigate,
  currentStudent,
  onGoToDashboard
}) {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header Hero Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-danger/10 text-danger text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Vetted &amp; Licensed Tour Directors
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            Learn From Top-Rated Master Instructors
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Gain an unfair career advantage by studying under veteran guides with decades of on-the-ground experience across Europe, Asia, and the Americas.
          </p>

          {/* Value props pill badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-secondary">
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9+ Average Guide Rating</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <Video className="w-4 h-4 text-primary" />
              <span>1-on-1 Feedback &amp; Video Critiques</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <MessageSquare className="w-4 h-4 text-danger" />
              <span>Direct Mentorship Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Mentors Section from Supabase */}
      <Mentors
        mentors={mentors}
        loading={loadingMentors}
        onSelectMentor={onSelectMentor}
      />

      {/* Why Mentorship Matters Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/15 px-3 py-1 rounded-full">
                  The Power of 1-on-1 Mentoring
                </span>
                <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold mt-3 mb-4">
                  Why Learn from an Active Tour Guide?
                </h3>
                <p className="text-secondary text-sm sm:text-base leading-relaxed font-medium mb-6">
                  Textbooks cannot teach you how to handle a 30-person group in sudden torrential rain, or how to captivate a distracted traveler at the Colosseum. Our mentors provide:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-dark font-bold text-sm mb-1">Authentic Field Feedback</div>
                    <div className="text-secondary text-xs font-medium leading-relaxed">
                      Submit recorded route rehearsals and receive detailed timing and storytelling advice.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-dark font-bold text-sm mb-1">Local Business Networks</div>
                    <div className="text-secondary text-xs font-medium leading-relaxed">
                      Gain recommendations for boutique tour operators, destination DMOs, and high-paying agencies.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-dark font-bold text-sm mb-1">Custom Tour Route Reviews</div>
                    <div className="text-secondary text-xs font-medium leading-relaxed">
                      Have a veteran review your custom walking or food tour concept before launching to the public.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-dark font-bold text-sm mb-1">Licensing Prep Assistance</div>
                    <div className="text-secondary text-xs font-medium leading-relaxed">
                      Get direct coaching for regional oral exams, badge examinations, and interview hurdles.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 text-center lg:text-right">
                <div className="p-6 rounded-3xl bg-dark text-white text-left space-y-4 shadow-xl">
                  <h4 className="text-lg font-bold">Ready to choose your guide?</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    When you enroll, you can assign your chosen instructor directly to your student dashboard.
                  </p>
                  <button
                    onClick={() => (currentStudent ? onGoToDashboard() : onOpenEnroll(null))}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-primary-btn hover:bg-primary-hover transition-all text-center"
                  >
                    {currentStudent ? 'View My Assigned Mentor' : 'Start Enrollment & Pick Mentor'}
                  </button>
                  <button
                    onClick={() => onNavigate('how-to-enroll')}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Read How Enrollment Works</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Partners & Newsletter */}
      <Partners />
      <Newsletter />
    </div>
  );
}
