import React from 'react';

export default function Mentors({ mentors, loading, onSelectMentor }) {
  return (
    <section id="mentors" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background shape */}
      <div className="absolute right-6 bottom-4 pointer-events-none -z-10 hidden xl:block">
        <img src="/assets/img/dest/shape.svg" alt="Decorative coil shape" className="w-24 opacity-75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Live From Supabase Tour Guide Network
          </div>
          <h5 className="text-secondary font-semibold text-base sm:text-lg uppercase tracking-wider mb-2">
            Master Instructors & Mentors
          </h5>
          <h3 className="font-cursive text-dark text-3xl sm:text-4xl lg:text-5xl font-bold capitalize">
            Learn From Top-Rated Tour Guides
          </h3>
          <p className="mt-3 text-secondary text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Choose your personal mentor from our shared international directory. 
            Receive 1-on-1 coaching, field feedback, and regional tour secrets.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-secondary text-sm font-medium">Loading accredited instructors from Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => {
              const fallbackAvatars = [
                '/assets/img/instructors/sophia.jpg',
                '/assets/img/instructors/mateo.jpg',
                '/assets/img/instructors/carlos.jpg',
                '/assets/img/instructors/kenji.jpg'
              ];
              const defaultAvatar = fallbackAvatars[index % fallbackAvatars.length];
              const imageSrc = mentor.picture 
                ? (mentor.picture.startsWith('http') || mentor.picture.startsWith('/') ? mentor.picture : `/${mentor.picture}`)
                : defaultAvatar;

              return (
                <div
                  key={mentor.id || index}
                  className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col border border-gray-100/80 group"
                >
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                    <img
                      src={imageSrc}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatar;
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-dark shadow-sm">
                      {mentor.rating ? `★ ${mentor.rating}` : '★ 5.0'}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-cursive text-dark text-xl font-bold">
                          {mentor.name}
                        </h4>
                        <span className="font-semibold text-primary text-sm whitespace-nowrap bg-primary/10 px-2.5 py-0.5 rounded-lg">
                          {mentor.rate || '$45/hr'}
                        </span>
                      </div>

                      <p className="text-secondary text-xs font-semibold tracking-wide uppercase text-[#DF6951] mb-3">
                        {mentor.specialty || 'Cultural & Historical Tour Specialist'}
                      </p>

                      {mentor.bio && (
                        <p className="text-secondary text-xs line-clamp-2 mb-4">
                          {mentor.bio}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-secondary text-xs font-medium">
                        <img src="/assets/img/dest/navigation.svg" alt="Location pin" className="w-4 h-4 opacity-75" />
                        <span className="truncate max-w-[160px]">{mentor.location || 'International'}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectMentor(mentor)}
                        className="px-4 py-2 rounded-xl bg-dark text-white text-xs font-medium hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        Choose Mentor
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
