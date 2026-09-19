import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { fetchTourGuides } from '../lib/supabase';
import { Calendar, MapPin, Star, Clock, Compass, ShieldCheck, User, MessageSquare, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentDashboard({ student, onLogout, onBackToHome, onUpdateStudent }) {
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'saved'

  useEffect(() => {
    async function loadBackendMentors() {
      try {
        setLoadingMentors(true);
        const data = await fetchTourGuides();
        setMentors(data);
      } catch (err) {
        console.error('Failed to load tour guides:', err);
      } finally {
        setLoadingMentors(false);
      }
    }
    loadBackendMentors();
  }, []);

  const assignedGuide = mentors.find(m => m.id === student.selected_mentor_id) || mentors[0];
  const travelerName = student.name || 'Traveler';

  return (
    <div className="min-h-screen bg-[#FBFBFE] pb-16">
      {/* Top Traveler Dashboard Navigation */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBackToHome}
              className="text-left focus:outline-none"
              title="Return to Marketplace"
            >
              <BrandLogo badge="Tour Guides" />
            </button>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Traveler Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-dark hover:bg-gray-50 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-primary" />
              <span>Explore More Guides</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl text-secondary hover:text-danger hover:bg-danger/10 transition-all"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-bold text-2xl shadow-inner font-cursive">
              {travelerName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cursive text-2xl sm:text-3xl font-bold text-dark">
                  Welcome back, {travelerName}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-success/15 text-success text-[11px] font-bold">
                  Verified Traveler
                </span>
              </div>
              <p className="text-secondary text-xs sm:text-sm mt-1">
                Manage your bespoke excursions, scheduled discovery consultations, and assigned local guides.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBackToHome}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm hover:bg-primary-hover shadow-primary-btn transition-all flex items-center justify-center gap-2"
            >
              <span>Book New Excursion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Traveler Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'bookings'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary hover:text-dark'
            }`}
          >
            My Excursions &amp; Bookings
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'saved'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary hover:text-dark'
            }`}
          >
            Saved Guides ({mentors.length})
          </button>
        </div>

        {activeTab === 'bookings' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Active Booking Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      Upcoming Reservation
                    </span>
                    <h3 className="font-cursive text-xl font-bold text-dark mt-0.5">
                      Private Cultural &amp; Heritage Tour
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirmed
                  </span>
                </div>

                {assignedGuide && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={assignedGuide.picture}
                        alt={assignedGuide.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'; }}
                      />
                      <div>
                        <h4 className="font-bold text-dark text-base">{assignedGuide.name}</h4>
                        <p className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>{assignedGuide.location}</span>
                        </p>
                        <p className="text-xs font-semibold text-primary mt-1">
                          Specialty: {assignedGuide.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto">
                      <div className="text-xs text-secondary font-medium">Fixed Rate:</div>
                      <div className="font-cursive text-xl font-bold text-dark">
                        ${assignedGuide.rate}/hr
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FFF9F2] border border-primary/20">
                    <span className="text-secondary block font-medium">Session Type</span>
                    <span className="font-bold text-dark mt-0.5 block">20-Min Discovery Session</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-secondary block font-medium">Payment Option</span>
                    <span className="font-bold text-dark mt-0.5 block">Pay In Person / Cash</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-secondary block font-medium">Meeting Point</span>
                    <span className="font-bold text-dark mt-0.5 block">Hotel Lobby / Designated Landmark</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    <span>Free cancellation up to 24 hours prior to meeting.</span>
                  </div>

                  <button
                    onClick={onBackToHome}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                  >
                    View Guide Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Booking Summary & Assistance */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
                <h3 className="font-cursive text-lg font-bold text-dark mb-4">
                  Traveler Support &amp; Concierge
                </h3>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                  Need to reschedule your tour, modify guest count, or add custom itinerary requests? Your personal tour concierge is available 24/7.
                </p>

                <div className="space-y-2.5 text-xs text-secondary font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Instant WhatsApp / Phone Guide Chat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>All Guides Background Vetted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Multi-Day Bundles with 10–20% Discount</span>
                  </div>
                </div>

                <button
                  onClick={onBackToHome}
                  className="w-full mt-6 py-3 rounded-xl bg-dark text-white font-semibold text-xs hover:bg-primary transition-all text-center"
                >
                  Explore More Local Excursions
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Saved Guides List */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={guide.picture}
                      alt={guide.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'; }}
                    />
                    <div>
                      <h4 className="font-bold text-dark text-base">{guide.name}</h4>
                      <p className="text-xs text-secondary flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span>{guide.location}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-secondary line-clamp-2 mb-4">
                    {guide.bio || guide.specialty}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs font-bold text-primary">
                    ${guide.rate}/hr
                  </div>
                  <button
                    onClick={onBackToHome}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-xs transition-all"
                  >
                    Book Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
