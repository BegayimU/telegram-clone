import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/auth';

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const chatsCount = 3;

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, []);

  const chats = [
    {
      id: '1',
      name: 'Anna',
      message: 'See you at 6 PM',
      status: 'online',
    },
    {
      id: '2',
      name: 'Alex',
      message: 'Typing a reply...',
      status: 'typing...',
    },
    {
      id: '3',
      name: 'Sara',
      message: 'Last seen 4m ago',
      status: 'last seen',
    },
  ];

  return (
    <div className="h-screen bg-[#FFF7FB] text-[#2D2D2D]">
      <div className="max-w-[1440px] mx-auto flex h-full w-full px-6 py-8">
        <div className="flex h-full w-full gap-8">
          <aside className="w-[320px] flex-none h-full rounded-[36px] bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_30px_80px_rgba(205,180,255,0.18)] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-[#CDB4FF] grid place-items-center text-xl font-bold text-white shadow-[0_12px_30px_rgba(205,180,255,0.25)]">
                  {user ? user.displayName?.charAt(0).toUpperCase() : 'G'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#8E8E93]">Welcome back</p>
                  <p className="text-lg font-semibold text-[#2D2D2D] truncate">
                    {user ? user.displayName || 'User' : 'Guest'}
                  </p>
                  {user && (
                    <p className="text-xs text-[#8E8E93] truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => navigate('/settings')}
                type="button"
                className="rounded-2xl border border-[#E9D7FF] bg-white px-4 py-2 text-sm font-semibold text-[#2D2D2D] shadow-sm transition hover:bg-[#FFC8DD]/80 flex-shrink-0"
              >
                Settings
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search chats"
                className="w-full rounded-3xl border border-[#E9D7FF] bg-[#FFF7FB] px-5 py-3 text-sm text-[#2D2D2D] outline-none transition focus:border-[#CDB4FF] focus:ring-2 focus:ring-[#EFD9FF]"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-[#2D2D2D]">Chats</h3>
              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-[#CDB4FF] text-xs font-semibold text-white">
                {chatsCount}
              </span>
            </div>

            <div className="space-y-4">
              {chats.map((chat) => (
                <NavLink
                  key={chat.id}
                  to={`/chat/${chat.id}`}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 rounded-3xl px-4 py-4 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#CDB4FF]/20 ring-1 ring-[#CDB4FF]/60 scale-[1.02] shadow-[0_12px_30px_rgba(205,180,255,0.2)]'
                        : 'bg-white hover:bg-[#F7E8FF] hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(205,180,255,0.15)]'
                    }`
                  }
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFC8DD] text-lg font-semibold text-[#2D2D2D] shadow-[0_12px_30px_rgba(255,200,221,0.25)]">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold text-[#2D2D2D]">{chat.name}</p>
                      <span
                        className={`text-xs font-medium ${
                          chat.status === 'online'
                            ? 'text-[#24C48A]'
                            : chat.status === 'typing...'
                            ? 'text-[#CDB4FF]'
                            : 'text-[#8E8E93]'
                        }`}
                      >
                        {chat.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#8E8E93]">{chat.message}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </aside>

          <main className="flex-1 h-full rounded-[36px] bg-[#FFFFFF] shadow-[0_30px_70px_rgba(205,180,255,0.12)] overflow-hidden">
            <div className="h-full w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
