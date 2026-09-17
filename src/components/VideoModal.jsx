import React, { useEffect } from 'react';

export default function VideoModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark/95">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-danger animate-ping"></span>
            <h3 className="text-white font-medium text-base sm:text-lg">
              Introduction to Professional Tour Guiding
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Embed */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/9dDrROWCF5U?autoplay=1&rel=0"
            title="Introduction to Tour Guiding - Roles, Skills & Career Pathways"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Caption */}
        <div className="px-6 py-3 bg-[#181E4B] text-gray-300 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Official TourGuide Academy Introductory Masterclass · ALLMYNE Industry Guide</span>
          <span className="text-primary font-medium">Certification Pathway · 2026 Edition</span>
        </div>
      </div>
    </div>
  );
}
