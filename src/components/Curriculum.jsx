import React from 'react';

const curriculumModules = [
  {
    icon: '/assets/img/category/icon1.png',
    title: 'Narrative & Storytelling',
    description: 'Transform dates and facts into spellbinding narratives that emotionally engage and enchant travelers of all cultures.',
    highlight: false
  },
  {
    icon: '/assets/img/category/icon2.png',
    title: 'Group Dynamics & Safety',
    description: 'Master crowd psychology, smooth pacing, emergency response, and seamless multi-stop itinerary management.',
    highlight: true // The distinctive accented card in the Jadoo theme
  },
  {
    icon: '/assets/img/category/icon3.png',
    title: 'Living Heritage & Culture',
    description: 'Interpret ancient architecture, art movements, local traditions, and hidden culinary trails like a true local insider.',
    highlight: false
  },
  {
    icon: '/assets/img/category/icon4.png',
    title: 'Business, Rates & Branding',
    description: 'Learn pricing models, build high-converting profile listings, and secure premium direct international bookings.',
    highlight: false
  }
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="relative pt-16 pb-20 overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-10 right-0 pointer-events-none -z-10 hidden lg:block opacity-60">
        <img src="/assets/img/category/shape.svg" style={{ maxWidth: '180px' }} alt="Background shape" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h5 className="text-secondary font-semibold text-base sm:text-lg uppercase tracking-wider mb-2">
            Academy Curriculum
          </h5>
          <h3 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">
            Essential Skills You Will Master
          </h3>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {curriculumModules.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 text-center transition-all duration-300 shadow-hover bg-white border border-gray-100 ${
                item.highlight ? 'shadow-2xl ring-1 ring-primary/20' : 'shadow-card'
              }`}
            >
              {item.highlight && (
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-danger/10 rounded-2xl -z-10 hidden sm:block" />
              )}
              
              <div className="h-20 flex items-center justify-center mb-6">
                <img src={item.icon} alt={item.title} className="h-16 object-contain" />
              </div>

              <h4 className="font-cursive text-dark text-xl font-bold mb-3">
                {item.title}
              </h4>

              <p className="text-secondary text-sm leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
