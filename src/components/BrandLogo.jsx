import React from 'react';

export default function BrandLogo({ badge = 'Tour Guides', className = '' }) {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      {/* Exact same font ('Poppins', sans-serif), text style, and size */}
      <span className="text-2xl font-bold tracking-tight text-[#181E4B] font-sans flex items-center leading-none">
        Book<span className="text-[#F1A501] font-extrabold">ing</span>
      </span>
      {badge && (
        <span className="text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#DF6951]/10 text-danger">
          {badge}
        </span>
      )}
    </div>
  );
}
