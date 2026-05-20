import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl bg-white shadow-[0_12px_30px_rgba(205,180,255,0.18)] border border-slate-200 p-6 ${className}`}>
      {children}
    </div>
  );
}
