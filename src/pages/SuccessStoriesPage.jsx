import React from 'react';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { Award, Star, Globe, TrendingUp, ArrowRight } from 'lucide-react';

export default function SuccessStoriesPage({
  onOpenEnroll,
  onNavigate,
  currentStudent,
  onGoToDashboard
}) {
  const alumniHighlights = [
    {
      name: 'Mateo Silva',
      city: 'Rome & Florence, Italy',
      tourType: 'Ancient Roman History & Colosseum Underground',
      rate: '€75 / hr',
      quote: 'Within 3 weeks of certification, I closed partnerships with two boutique American travel agencies. The storytelling module was the catalyst.',
      rating: 5.0,
      image: '/assets/img/testimonial/author.png'
    },
    {
      name: 'Sophie Laurent',
      city: 'Paris & Versailles, France',
      tourType: 'Art History & Gourmet Pastry Walking Tours',
      rate: '€65 / hr',
      quote: 'My mentor taught me how to price high-end private excursions instead of competing for low-margin free tours. Now I am fully booked months in advance.',
      rating: 5.0,
      image: '/assets/img/testimonial/author2.png'
    },
    {
      name: 'Kenji Tanaka',
      city: 'Kyoto, Japan',
      tourType: 'Zen Temples, Tea Ceremonies & Geisha Culture',
      rate: '¥12,000 / hr',
      quote: 'I learned how to engage non-Japanese speaking travelers respectfully and entertainingly. The crowd control drills were priceless during cherry blossom season.',
      rating: 5.0,
      image: '/assets/img/testimonial/author3.png'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header Hero Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-success/15 text-success text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            Verified Graduate Transformations
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            Certified Graduate Success Stories
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Real stories, real earnings, and real career transformations from guides who went through the Learn Tour Guide Academy.
          </p>

          {/* Key Metric Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">98%</div>
              <div className="text-xs text-secondary font-medium mt-1">Licensing Success Rate</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-danger">$58/hr</div>
              <div className="text-xs text-secondary font-medium mt-1">Avg Starting Private Rate</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark">40+</div>
              <div className="text-xs text-secondary font-medium mt-1">Countries Represented</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-bold text-success">5.0 ★</div>
              <div className="text-xs text-secondary font-medium mt-1">Average Graduate Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Testimonials Slider */}
      <Testimonials />

      {/* In-Depth Alumni Showcase Cards */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Alumni Spotlights
            </h2>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl font-bold">
              Where Are Our Graduates Guiding Today?
            </h3>
            <p className="text-secondary text-sm sm:text-base font-medium mt-2">
              From historic European capitals to sacred Asian shrines and bustling American metropolises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {alumniHighlights.map((alumni, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                    />
                    <div>
                      <h4 className="font-cursive text-dark text-xl font-bold leading-tight">
                        {alumni.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-secondary font-medium">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        <span>{alumni.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-xs font-bold text-dark ml-1">5.0</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
                    <div className="text-[11px] font-bold text-gray-400 uppercase">Specialty Tour</div>
                    <div className="text-xs font-semibold text-dark mt-0.5">{alumni.tourType}</div>
                    <div className="text-xs font-bold text-danger mt-1">Earning: {alumni.rate}</div>
                  </div>

                  <p className="text-secondary text-xs sm:text-sm italic leading-relaxed font-medium">
                    "{alumni.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-success">
                  <span>✓ Verified Graduate</span>
                  <span>Active Tour Director</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Enroll Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-card text-center max-w-3xl mx-auto">
            <h3 className="font-cursive text-dark text-2xl sm:text-3xl font-bold mb-3">
              Write Your Own Success Story
            </h3>
            <p className="text-secondary text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Join our international community of tour professionals and discover the freedom and joy of sharing culture with travelers.
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
                <span>Find Your Mentor</span>
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
