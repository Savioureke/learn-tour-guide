import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, DollarSign, MapPin, Star, User, Users, CheckCircle, ShieldCheck, X } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, guide }) {
  if (!isOpen || !guide) return null;

  // Extract base numerical rate (e.g. "$45/hr" -> 45)
  const baseRateNum = parseInt(guide.rate?.replace(/[^0-9]/g, '') || '45', 10);

  const [packageType, setPackageType] = useState('single'); // 'free-intro' | 'single' | 'bundle-5' | 'bundle-10'
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' | 'in-person'
  
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:30');
  const [partySize, setPartySize] = useState(2);
  const [notes, setNotes] = useState('');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Price calculations
  let totalPrice = baseRateNum;
  let packageLabel = 'Single Private Excursion';
  if (packageType === 'free-intro') {
    totalPrice = 0;
    packageLabel = '20-Min Free Discovery Consultation';
  } else if (packageType === 'single') {
    totalPrice = baseRateNum;
    packageLabel = '1 Private Excursion (Standard)';
  } else if (packageType === 'bundle-5') {
    totalPrice = Math.round(baseRateNum * 5 * 0.9); // 10% discount
    packageLabel = '5-Excursion Explorer Bundle (10% Off)';
  } else if (packageType === 'bundle-10') {
    totalPrice = Math.round(baseRateNum * 10 * 0.8); // 20% discount
    packageLabel = '10-Excursion VIP Package (20% Off)';
  }

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!travelerName || !travelerEmail) {
      alert('Please fill in your name and email address.');
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      const generatedRef = 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingRef(generatedRef);
      setSubmitting(false);
      setBookingConfirmed(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-dark to-[#242C44] text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={guide.picture || '/assets/img/instructors/sophia.jpg'}
              alt={guide.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                  Certified Local Guide
                </span>
                <span className="flex items-center text-xs font-semibold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  {guide.rating || '5.0'}
                </span>
              </div>
              <h2 className="font-cursive text-2xl font-bold text-white mt-1">
                Book with {guide.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-danger" />
                <span>{guide.location}</span>
                <span>·</span>
                <span className="text-primary font-semibold">{guide.rate || '$45/hr'} fixed rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {bookingConfirmed ? (
            /* Confirmation Receipt State */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-cursive text-dark text-3xl font-bold">
                  Reservation Confirmed!
                </h3>
                <p className="text-secondary text-sm font-medium mt-1">
                  Your booking request with <strong className="text-dark">{guide.name}</strong> has been confirmed.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-secondary font-medium">Booking Reference</span>
                  <span className="text-sm font-bold text-dark tracking-wider font-mono">{bookingRef}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary">Selected Package:</span>
                  <span className="font-bold text-dark">{packageLabel}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary">Date &amp; Time:</span>
                  <span className="font-bold text-dark">{bookingDate || 'Scheduled on request'} at {bookingTime}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary">Party Size:</span>
                  <span className="font-bold text-dark">{partySize} Guest(s)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary">Payment Method:</span>
                  <span className="font-bold uppercase text-primary">
                    {paymentMethod === 'online' ? 'Paid Online (Secured)' : 'Pay in Person (On Arrival)'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-sm font-bold">
                  <span className="text-dark">Total Price:</span>
                  <span className="text-lg text-danger">${totalPrice}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-info font-medium max-w-lg mx-auto leading-relaxed flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0 text-info" />
                <span>We sent a confirmation copy to <strong>{travelerEmail}</strong>. {guide.name} has received your itinerary notes.</span>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover shadow-primary-btn transition-all"
              >
                Back to Guide Marketplace
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              
              {/* Step 1: Package Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-3">
                  1. Select Tour Package or Free Consultation
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* 20-Min Free Consultation */}
                  <label
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'free-intro'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-dark flex items-center gap-1.5">
                          <span>Free Discovery Call</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-success/20 text-success font-bold">FREE</span>
                        </div>
                        <p className="text-[11px] text-secondary mt-1 font-medium">
                          20-min consultation call to review your custom plans.
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="packageType"
                        value="free-intro"
                        checked={packageType === 'free-intro'}
                        onChange={() => setPackageType('free-intro')}
                        className="text-primary focus:ring-primary mt-1"
                      />
                    </div>
                    <div className="text-sm font-bold text-success mt-2">$0 Free</div>
                  </label>

                  {/* Single Excursion */}
                  <label
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'single'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-dark">Single Private Excursion</div>
                        <p className="text-[11px] text-secondary mt-1 font-medium">
                          Standard half-day / walking tour with your dedicated guide.
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="packageType"
                        value="single"
                        checked={packageType === 'single'}
                        onChange={() => setPackageType('single')}
                        className="text-primary focus:ring-primary mt-1"
                      />
                    </div>
                    <div className="text-sm font-bold text-dark mt-2">${baseRateNum}</div>
                  </label>

                  {/* 5-Session Explorer */}
                  <label
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'bundle-5'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-dark flex items-center gap-1.5">
                          <span>5-Excursion Bundle</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-danger/10 text-danger font-bold">10% OFF</span>
                        </div>
                        <p className="text-[11px] text-secondary mt-1 font-medium">
                          Multi-day itinerary covering main monuments and hidden quarters.
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="packageType"
                        value="bundle-5"
                        checked={packageType === 'bundle-5'}
                        onChange={() => setPackageType('bundle-5')}
                        className="text-primary focus:ring-primary mt-1"
                      />
                    </div>
                    <div className="text-sm font-bold text-dark mt-2">
                      ${Math.round(baseRateNum * 5 * 0.9)}{' '}
                      <span className="text-xs text-gray-400 line-through font-normal">${baseRateNum * 5}</span>
                    </div>
                  </label>

                  {/* 10-Session VIP Package */}
                  <label
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      packageType === 'bundle-10'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-dark flex items-center gap-1.5">
                          <span>10-Excursion VIP Package</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/20 text-primary font-bold">20% OFF</span>
                        </div>
                        <p className="text-[11px] text-secondary mt-1 font-medium">
                          Full week private VIP directorship for maximum flexibility.
                        </p>
                      </div>
                      <input
                        type="radio"
                        name="packageType"
                        value="bundle-10"
                        checked={packageType === 'bundle-10'}
                        onChange={() => setPackageType('bundle-10')}
                        className="text-primary focus:ring-primary mt-1"
                      />
                    </div>
                    <div className="text-sm font-bold text-dark mt-2">
                      ${Math.round(baseRateNum * 10 * 0.8)}{' '}
                      <span className="text-xs text-gray-400 line-through font-normal">${baseRateNum * 10}</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Step 2: Date, Time & Traveler Info */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-3">
                  2. Traveler Details &amp; Date
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-secondary font-medium mb-1">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={travelerName}
                        onChange={(e) => setTravelerName(e.target.value)}
                        placeholder="e.g. Jessica Adams"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-secondary font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      placeholder="jessica@example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-secondary font-medium mb-1">Tour Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-secondary font-medium mb-1">Preferred Time &amp; Guests</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-1/2 px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      />
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-1/2 px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      >
                        <option value={1}>1 Guest (Solo)</option>
                        <option value={2}>2 Guests</option>
                        <option value={4}>3-4 Guests</option>
                        <option value={6}>5-6 Guests</option>
                        <option value={10}>7+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-secondary font-medium mb-1">Special Wishes or Tour Focus (Optional)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell your guide about dietary allergies, accessibility needs, or favorite landmarks..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                  />
                </div>
              </div>

              {/* Step 3: Flexible Payment Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-3">
                  3. Flexible Payment Options
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option A: Pay Online */}
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                      paymentMethod === 'online'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-dark">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span>Pay Online Securely</span>
                      </div>
                      <p className="text-[11px] text-secondary mt-1 font-medium">
                        Instant reservation guaranteed with Credit/Debit Card or Apple/Google Pay.
                      </p>
                    </div>
                  </label>

                  {/* Option B: Pay In Person */}
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                      paymentMethod === 'in-person'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="in-person"
                      checked={paymentMethod === 'in-person'}
                      onChange={() => setPaymentMethod('in-person')}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-dark">
                        <DollarSign className="w-4 h-4 text-success" />
                        <span>Pay in Person (Cash)</span>
                      </div>
                      <p className="text-[11px] text-secondary mt-1 font-medium">
                        Book now without paying online. Pay cash directly to your guide when you meet.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Price Summary & Submit CTA */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-secondary font-medium">Total Reservation Due:</div>
                  <div className="text-2xl font-bold font-cursive text-dark">
                    ${totalPrice}
                    <span className="text-xs font-normal text-gray-500 font-sans ml-1">
                      ({paymentMethod === 'online' ? 'Charged Now' : 'Pay On Arrival'})
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover shadow-primary-btn transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Confirming...</span>
                  ) : (
                    <span>
                      {packageType === 'free-intro'
                        ? 'Schedule Free Call'
                        : paymentMethod === 'online'
                        ? `Pay $${totalPrice} & Confirm`
                        : 'Confirm Booking (Pay On Arrival)'}
                    </span>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
