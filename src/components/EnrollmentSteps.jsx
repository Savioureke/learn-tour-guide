import React from 'react';

export default function EnrollmentSteps({ onOpenEnroll }) {
  return (
    <section id="how-to-start" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3 Steps */}
          <div className="lg:col-span-6 text-left">
            <h5 className="text-secondary font-semibold text-base sm:text-lg uppercase tracking-wider mb-2">
              Fast & Streamlined Pathway
            </h5>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-[46px] font-bold leading-tight mb-10">
              Become a Certified Tour Guide in 3 Easy Steps
            </h3>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <img src="/assets/img/steps/selection.svg" width="22" alt="Step 1" />
                </div>
                <div>
                  <h5 className="text-secondary font-bold text-base mb-1 group-hover:text-dark transition-colors">
                    1. Choose Your Master Mentor & Specialty
                  </h5>
                  <p className="text-secondary text-sm font-medium leading-relaxed">
                    Select a verified instructor based on their regional expertise, language capabilities, 
                    and tour guiding credentials.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-danger flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <img src="/assets/img/steps/water-sport.svg" width="22" alt="Step 2" />
                </div>
                <div>
                  <h5 className="text-secondary font-bold text-base mb-1 group-hover:text-dark transition-colors">
                    2. Register Your Student Profile
                  </h5>
                  <p className="text-secondary text-sm font-medium leading-relaxed">
                    Submit your details (name, email, phone, and address) directly to our shared central 
                    admin database with zero hassle.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-info flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <img src="/assets/img/steps/taxi.svg" width="22" alt="Step 3" />
                </div>
                <div>
                  <h5 className="text-secondary font-bold text-base mb-1 group-hover:text-dark transition-colors">
                    3. Practice Field Drills & Earn Certification
                  </h5>
                  <p className="text-secondary text-sm font-medium leading-relaxed">
                    Complete simulated walking tours, master voice projection and safety protocols, 
                    and graduate with an industry-recognized certificate.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => onOpenEnroll()}
                className="px-8 py-3.5 rounded-xl bg-primary text-white font-medium shadow-primary-btn hover:bg-primary-hover transition-all"
              >
                Start Registration
              </button>
            </div>
          </div>

          {/* Right Column: Floating Preview Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            {/* Background Glow */}
            <div className="absolute -right-20 -top-24 pointer-events-none -z-10 opacity-70 hidden sm:block">
              <img src="/assets/img/steps/bg.png" style={{ maxWidth: '520px' }} alt="Background halo" />
            </div>

            <div className="relative w-full max-w-[380px] bg-white rounded-3xl p-5 shadow-2xl border border-gray-100">
              {/* Card Thumbnail */}
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="/assets/img/steps/booking-img.jpg"
                  alt="Tour Guide Practical Session"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* Card Meta */}
              <h5 className="font-cursive text-dark text-lg font-bold mb-1">
                International Heritage Guide Diploma
              </h5>
              <p className="text-secondary text-xs font-medium mb-4">
                Comprehensive 6-Week Immersion | Guided by Top Instructors
              </p>

              {/* Action Icons */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <img src="/assets/img/steps/leaf.svg" width="14" alt="Eco certification" />
                </span>
                <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <img src="/assets/img/steps/map.svg" width="14" alt="Route planning" />
                </span>
                <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <img src="/assets/img/steps/send.svg" width="14" alt="Direct bookings" />
                </span>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-secondary text-xs font-medium">
                  <img src="/assets/img/steps/building.svg" width="16" alt="Enrolled students" />
                  <span>84 Students Currently Enrolled</span>
                </div>
                <button className="text-danger hover:scale-110 transition-transform">
                  <img src="/assets/img/steps/heart.svg" width="20" alt="Save program" />
                </button>
              </div>

              {/* Floating Mini Overlay Card */}
              <div className="absolute -right-6 sm:-right-10 bottom-16 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 w-64 animate-bounce-subtle">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/assets/img/steps/favorite-placeholder.png"
                    alt="Active mentor"
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-semibold text-danger uppercase tracking-wider">Live Class</span>
                    <h6 className="text-dark font-bold text-xs">Vatican History & Voice Pacing</h6>
                  </div>
                </div>

                <div className="text-[11px] font-medium text-secondary flex justify-between mb-1.5">
                  <span>Class Progress</span>
                  <span className="text-dark font-bold">85% completed</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
