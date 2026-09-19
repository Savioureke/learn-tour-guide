import React from 'react';
import EnrollmentSteps from '../components/EnrollmentSteps';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { UserCheck, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';

export default function HowToEnrollPage({
  onOpenEnroll,
  onNavigate,
  currentStudent,
  onGoToDashboard
}) {
  const faqs = [
    {
      q: 'What are the prerequisites to enroll?',
      a: 'No prior tour guiding license is required! All you need is a passion for travel, basic communication skills, and enthusiasm for storytelling. We teach everything from group safety to pricing.'
    },
    {
      q: 'How long does it take to complete the training?',
      a: 'The curriculum is self-paced. Most students complete all 6 core masterclass tutorials and 1-on-1 mentor consultations within 2 to 4 weeks, depending on their schedule.'
    },
    {
      q: 'How does mentor assignment work?',
      a: 'You can choose your preferred instructor directly during registration or browse instructors anytime from your Student Dashboard. You can switch mentors or seek specific regional feedback anytime.'
    },
    {
      q: 'Is my progress saved automatically?',
      a: 'Yes! Your student profile, completed lessons, and assigned instructor are synced in real-time to our central Supabase cloud database, accessible on any device.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header Hero Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-info/15 text-info text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4" />
            Simple 3-Step Enrollment Process
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            How to Enroll in Learn Tour Guide
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Get started in under two minutes with zero bureaucratic barriers. Step into an internationally recognized pathway designed for aspiring guides and travel leaders.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-secondary">
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <UserCheck className="w-4 h-4 text-primary" />
              <span>Instant Account Creation</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <Shield className="w-4 h-4 text-success" />
              <span>Verified Instructor Pairing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Step Pathway Section */}
      <EnrollmentSteps
        onOpenEnroll={() => (currentStudent ? onGoToDashboard() : onOpenEnroll(null))}
      />

      {/* Enrollment FAQ Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-danger mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl font-bold">
              Everything You Need to Know
            </h3>
            <p className="text-secondary text-sm sm:text-base font-medium mt-2">
              Common questions about joining Learn Tour Guide Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-card hover:shadow-lg transition-all"
              >
                <h4 className="font-cursive text-dark text-lg sm:text-xl font-bold mb-2">
                  {faq.q}
                </h4>
                <p className="text-secondary text-sm font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Enroll Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-card text-center max-w-3xl mx-auto">
            <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold mb-3">
              Ready to Begin Step 1?
            </h3>
            <p className="text-secondary text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Join hundreds of motivated students already enrolled in Learn Tour Guide Academy and prepare for your first guided tour.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => (currentStudent ? onGoToDashboard() : onOpenEnroll(null))}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-primary-btn hover:bg-primary-hover transition-all"
              >
                {currentStudent ? 'Go to My Dashboard' : 'Start Enrollment Now'}
              </button>
              <button
                onClick={() => onNavigate('curriculum')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 text-dark font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Curriculum</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
