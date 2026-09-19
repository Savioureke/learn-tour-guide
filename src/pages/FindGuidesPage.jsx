import React, { useState } from 'react';
import { Search, MapPin, Star, ShieldCheck, DollarSign, Filter, Compass, MessageCircle } from 'lucide-react';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';

export default function FindGuidesPage({ mentors = [], onBookGuide }) {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fallbackAvatars = [
    '/assets/img/instructors/sophia.jpg',
    '/assets/img/instructors/mateo.jpg',
    '/assets/img/instructors/carlos.jpg',
    '/assets/img/instructors/kenji.jpg'
  ];

  const filteredGuides = mentors.filter((guide) => {
    const matchesCity =
      selectedCity === 'all' ||
      guide.location?.toLowerCase().includes(selectedCity.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      guide.specialty?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      guide.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.specialty?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 sm:pt-28">
      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FFF5EC] to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4" />
            Verified Local Tour Guides Directory
          </div>
          <h1 className="font-cursive text-dark text-3xl sm:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            Find Your Private Local Tour Guide
          </h1>
          <p className="mt-4 text-secondary text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Browse accredited guides across the world's most captivating destinations. Enjoy non-negotiable transparent rates, flexible online/in-person payments, and tailor-made itineraries.
          </p>

          {/* Filter Bar Controls */}
          <div className="mt-8 bg-white p-4 rounded-3xl shadow-card border border-gray-100 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide name or landmark..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {/* City Dropdown */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-dark focus:ring-2 focus:ring-primary outline-none cursor-pointer"
              >
                <option value="all">All Destinations</option>
                <option value="rome">Rome &amp; Florence, Italy</option>
                <option value="paris">Paris &amp; Versailles, France</option>
                <option value="madrid">Madrid &amp; Barcelona, Spain</option>
                <option value="kyoto">Kyoto &amp; Tokyo, Japan</option>
                <option value="cape town">Cape Town, South Africa</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-dark focus:ring-2 focus:ring-primary outline-none cursor-pointer"
              >
                <option value="all">All Specialties</option>
                <option value="history">Historical &amp; Heritage Walks</option>
                <option value="culinary">Culinary &amp; Wine Tastings</option>
                <option value="architecture">Architecture &amp; Museums</option>
                <option value="safari">Wildlife &amp; Outdoor Expeditions</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-dark font-cursive text-2xl sm:text-3xl font-bold">
              Available Tour Guides ({filteredGuides.length})
            </h2>
            <span className="text-xs font-semibold text-secondary">
              Fixed hourly rates · No hidden fees
            </span>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm border border-gray-200">
              <p className="text-secondary text-sm font-medium">
                No tour guides match your filter. Try selecting "All Destinations" or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCity('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide, idx) => {
                const defaultAvatar = fallbackAvatars[idx % fallbackAvatars.length];
                const imageSrc = guide.picture
                  ? (guide.picture.startsWith('http') || guide.picture.startsWith('/') ? guide.picture : `/${guide.picture}`)
                  : defaultAvatar;

                return (
                  <div
                    key={guide.id || idx}
                    className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={imageSrc}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultAvatar;
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-dark shadow-sm flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{guide.rating || '5.0'}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-success" />
                        <span>Verified Guide</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-cursive text-dark text-xl font-bold">
                            {guide.name}
                          </h3>
                          <span className="text-sm font-bold text-danger">
                            {guide.rate || '$45/hr'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-secondary text-xs font-medium mb-3">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{guide.location}</span>
                        </div>

                        <div className="text-xs font-semibold text-dark bg-gray-50 p-2 rounded-xl border border-gray-100 mb-3">
                          <span className="text-primary mr-1">Specialty:</span>
                          {guide.specialty}
                        </div>

                        <p className="text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
                          {guide.bio}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] font-semibold text-secondary">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-dark">Half Day</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-dark">Full Day</span>
                          <span className="px-2 py-0.5 rounded bg-success/15 text-success">Free 20-Min Call</span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() => onBookGuide(guide)}
                          className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-primary-btn transition-all text-center"
                        >
                          Book Guide
                        </button>
                        <button
                          onClick={() => onBookGuide(guide)}
                          className="p-3 rounded-xl border border-gray-200 text-primary hover:bg-gray-50"
                          title="Free Discovery Call"
                        >
                          <MessageCircle className="w-4 h-4" />
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

      {/* Partners & Newsletter */}
      <Partners />
      <Newsletter />
    </div>
  );
}
