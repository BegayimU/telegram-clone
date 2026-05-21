import React from 'react';

export default function Input({ className = '', disabled = false, ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-[#E9D7FF] bg-[#FFFFFF] px-4 py-3 text-sm text-[#2D2D2D] shadow-sm outline-none transition focus:border-[#CDB4FF] focus:ring-2 focus:ring-[#EFD9FF] disabled:bg-[#FFF7FB] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
