import React from 'react';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';
import { Search, CalendarCheck, CreditCard, ShieldCheck, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export default function HowToEnrollPage({ onNavigate }) {
  const steps = [
    {
      number: '01',
      title: 'Discover & Choose Your Local Guide',
      desc: 'Search our directory by destination, specialty (history, culinary, architecture, wildlife), and traveler reviews. Read verified credentials and transparent fixed rates.',
      icon: Search,
      color: 'bg-primary'
    },
    {
      number: '02',
      title: 'Select Your Schedule & Package',
      desc: 'Pick your preferred date and time. Choose between a 20-min free discovery consultation, a single private excursion, or a discounted 5 or 10-excursion package.',
      icon: CalendarCheck,
      color: 'bg-danger'
    },
    {
      number: '03',
      title: 'Choose Flexible Payment (Online or In-Person)',
      desc: 'Confirm your booking with complete peace of mind. Pay online securely with credit card or select Pay in Person to settle cash directly with your guide upon meeting.',
      icon: CreditCard,
      color: 'bg-info'
    }
  ];

  const faqs = [
    {
      q: 'Can I customize the tour itinerary with my guide?',
      a: 'Yes! All private excursions booked through our platform are completely personalized. You can request specific monuments, dietary preferences for food walks, or pacing adjustments directly.'
    },
    {
      q: 'How does the free 20-minute discovery call work?',
      a: 'If offered by your chosen guide, you can schedule a complimentary 20-minute video or phone consultation to discuss your custom travel goals before paying any excursion fees.'
    },
    {
      q: 'How does "Pay in Person" work?',
      a: 'If you select Pay in Person, your reservation is confirmed immediately without requiring card details. You pay the exact agreed fixed fee in local currency or USD directly to your guide when you meet.'
    },
    {
      q: 'Are all guides licensed and background-checked?',
      a: 'Yes. Every guide listed on our marketplace has verified credentials, local badges, and proven experience in their respective jurisdictions.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-info/15 text-info text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Simple 3-Step Reservation Process
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            How to Book a Guide in 3 Easy Steps
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Booking a certified private tour guide has never been simpler. Enjoy transparent fixed rates, free consultations, and flexible payment options.
          </p>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-3xl p-8 border border-gray-100 relative group hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${s.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-cursive font-bold text-gray-300 group-hover:text-primary transition-colors">
                      {s.number}
                    </span>
                  </div>

                  <h3 className="font-cursive text-dark text-xl font-bold mb-3">
                    {s.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct CTA */}
          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('find-guides')}
              className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover shadow-primary-btn transition-all inline-flex items-center gap-2"
            >
              <span>Explore Guides &amp; Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Traveler FAQs */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-danger mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Traveler Questions</span>
            </div>
            <h3 className="font-cursive text-dark text-3xl sm:text-4xl font-bold">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-card hover:shadow-md transition-all"
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
        </div>
      </section>

      <Partners />
      <Newsletter />
    </div>
  );
}
