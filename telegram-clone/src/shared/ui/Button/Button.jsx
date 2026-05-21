import React from 'react';

export default function Button({ children, className = '', disabled = false, ...props }) {
  return (
    <button
      type="button"
      className={`rounded-xl bg-[#CDB4FF] px-5 py-3 text-sm font-semibold text-[#2D2D2D] shadow-[0_10px_24px_rgba(205,180,255,0.25)] transition hover:bg-[#d9c1ff] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#CDB4FF] ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
