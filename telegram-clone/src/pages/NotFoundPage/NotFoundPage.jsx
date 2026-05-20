import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-[#FFF7FB] p-6">
      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-[0_30px_70px_rgba(205,180,255,0.18)] text-center">
        <p className="text-7xl font-bold text-[#CDB4FF]">404</p>
        <h1 className="mt-6 text-3xl font-semibold text-[#2D2D2D]">Page not found</h1>
        <p className="mt-3 text-sm text-[#8E8E93]">The page you are looking for does not exist.</p>
        <button
          type="button"
          onClick={() => navigate('/chat')}
          className="mt-8 inline-flex items-center justify-center rounded-3xl bg-[#CDB4FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b89dff]"
        >
          Go to chats
        </button>
      </div>
    </div>
  );
}
