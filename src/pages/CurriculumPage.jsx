import React from 'react';
import Curriculum from '../components/Curriculum';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { Award, CheckCircle, Clock, FileText, Sparkles, ArrowRight } from 'lucide-react';

export default function CurriculumPage({ onOpenEnroll, onNavigate, currentStudent, onGoToDashboard }) {
  const syllabusDetails = [
    {
      module: 'Module 1',
      title: 'Narrative Architecture & Storytelling Mastery',
      duration: '4 Core Sessions · Practical Exercises',
      summary: 'Turn dry historical dates into emotionally compelling, unforgettable living stories.',
      highlights: [
        'The 3-act narrative hook for famous monuments and landmarks',
        'Humor, intrigue, and local folk secrets that enchant diverse traveler groups',
        'Vocal projection, cadence, and holding audience attention in loud outdoor spaces',
        'Adapting stories spontaneously for families, VIPs, or history enthusiasts'
      ]
    },
    {
      module: 'Module 2',
      title: 'Group Dynamics, Safety & Crisis Management',
      duration: '3 Core Sessions · Scenario Drills',
      summary: 'Command tour groups with effortless authority, smooth pacing, and safety protocols.',
      highlights: [
        'Managing stragglers, group pacing, and crowded tourist bottlenecks',
        'Medical emergency basics, lost tourist protocols, and local authority coordination',
        'Cross-cultural etiquette and avoiding cultural friction or misunderstandings',
        'Weather contingencies and dynamic route adjustments on the fly'
      ]
    },
    {
      module: 'Module 3',
      title: 'Living Heritage, Architecture & Local Gastronomy',
      duration: '4 Core Sessions · Field Study Guide',
      summary: 'Decode architecture, artwork, religious traditions, and culinary secrets like a local insider.',
      highlights: [
        'Visual literacy: spotting Gothic, Baroque, Renaissance & Modern styles at a glance',
        'Curating authentic food tastings, street food safety, and hidden artisan stops',
        'Balancing heavy historical context with fun, relatable modern lifestyle anecdotes',
        'Handling difficult questions accurately without breaking narrative flow'
      ]
    },
    {
      module: 'Module 4',
      title: 'The Business of Guiding: Rates, Profile & Direct Clients',
      duration: '3 Core Sessions · Entrepreneur Toolkit',
      summary: 'Scale your income, earn $50-$100+/hr, and book private high-value international travelers.',
      highlights: [
        'Calculating hourly & group rates across high vs. low seasons',
        'Optimizing listings on Viator, GetYourGuide, Airbnb Experiences, and your direct site',
        'Techniques for earning generous tips ethically and building glowing 5-star reviews',
        'Building repeat relationships with boutique luxury travel agencies and hotels'
      ]
    }
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header Hero Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Accredited Professional Curriculum
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            Comprehensive Tour Guide Curriculum
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Engineered by licensed tour directors and active master guides. Master the exact storytelling, safety, and business competencies required for international accreditation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-secondary">
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <Clock className="w-4 h-4 text-primary" />
              <span>Self-Paced + Live Mentoring</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <FileText className="w-4 h-4 text-danger" />
              <span>4 In-Depth Core Modules</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              <Award className="w-4 h-4 text-success" />
              <span>Official Academy Certification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 4 Curriculum Cards */}
      <Curriculum />

      {/* Expanded Syllabus Breakdown */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-danger mb-2">
              Detailed Syllabus Breakdown
            </h2>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl font-bold">
              Inside Every Learning Module
            </h3>
            <p className="text-secondary text-sm sm:text-base font-medium mt-2">
              Each module combines actionable theory, real-world case studies, and field exercises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {syllabusDetails.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {item.module}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {item.duration}
                  </span>
                </div>

                <h4 className="font-cursive text-dark text-2xl font-bold mb-3">
                  {item.title}
                </h4>
                <p className="text-secondary text-sm font-medium leading-relaxed mb-6">
                  {item.summary}
                </p>

                <div className="pt-5 border-t border-gray-100">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-dark mb-3">
                    Key Competencies You'll Acquire:
                  </h5>
                  <ul className="space-y-2.5">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary font-medium">
                        <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-card text-center max-w-3xl mx-auto">
            <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold mb-3">
              Ready to Master These Modules?
            </h3>
            <p className="text-secondary text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Sign up today, pair with a verified master guide from our directory, and start transforming your passion into a high-earning profession.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => (currentStudent ? onGoToDashboard() : onOpenEnroll(null))}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-primary-btn hover:bg-primary-hover transition-all"
              >
                {currentStudent ? 'Go to My Dashboard' : 'Enroll in Academy'}
              </button>
              <button
                onClick={() => onNavigate('instructors')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 text-dark font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <span>View Certified Instructors</span>
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
