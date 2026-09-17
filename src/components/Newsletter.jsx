import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="relative py-16 px-6 sm:px-12 text-center rounded-3xl sm:rounded-large-cta overflow-hidden"
          style={{ backgroundColor: 'rgba(223, 215, 249, 0.22)' }}
        >
          {/* Top-right floating send icon */}
          <div className="absolute top-4 right-4 sm:right-8 -translate-y-2 pointer-events-none z-10">
            <img src="/assets/img/cta/send.png" style={{ maxWidth: '64px' }} alt="Send paper plane" />
          </div>

          {/* Background shapes */}
          <div className="absolute top-0 right-0 pointer-events-none -z-0 opacity-70">
            <img src="/assets/img/cta/shape-bg2.png" width="240" alt="CTA shape 2" />
          </div>
          <div className="absolute bottom-0 left-0 pointer-events-none -z-0 hidden sm:block opacity-70">
            <img src="/assets/img/cta/shape-bg1.png" style={{ maxWidth: '320px' }} alt="CTA shape 1" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-cursive text-dark text-2xl sm:text-3xl lg:text-4xl font-bold leading-relaxed mb-8">
              Subscribe for Free Tour Guiding Masterclasses, Script Blueprints & High-Paying Travel Leads
            </h2>

            {subscribed ? (
              <div className="p-4 bg-white/90 rounded-2xl text-success font-semibold text-sm max-w-md mx-auto shadow-sm">
                ✓ Thank you for subscribing! We've sent your free "Tour Guiding Script Blueprint" guide.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <img src="/assets/img/cta/mail.svg" width="18" alt="Mail icon" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-white border-0 text-dark placeholder:text-gray-400 text-sm focus:ring-2 focus:ring-danger outline-none shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-medium text-sm orange-gradient-btn hover:opacity-95 transition-opacity whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
