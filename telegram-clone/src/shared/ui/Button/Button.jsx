import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`rounded-xl bg-[#CDB4FF] px-5 py-3 text-sm font-semibold text-[#2D2D2D] shadow-[0_10px_24px_rgba(205,180,255,0.25)] transition hover:bg-[#d9c1ff] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
