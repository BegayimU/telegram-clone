import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/auth';
import {
  getUsers,
  updateUserStatus
} from '../../services/userService';

export default function MainLayout({ children }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');

  const chatsCount = chats.length;

  const filteredChats = chats.filter(
    (chat) =>
      chat.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  useEffect(() => {

    const currentUser =
      auth.currentUser;

    if (!currentUser) return;

    const uid =
      currentUser.uid;

    const loadCurrentUser =
      async () => {

      const users =
        await getUsers();

      const dbUser =
        users.find(
          (u) =>
            u.id === uid
        );

      setUser(dbUser);

      updateUserStatus(
        uid,
        'online'
      );

    };

    loadCurrentUser();

    const handleOffline =
      () => {

      updateUserStatus(
        uid,
        'offline'
      );

    };

    window.addEventListener(
      'beforeunload',
      handleOffline
    );

    return () => {

      handleOffline();

      window.removeEventListener(
        'beforeunload',
        handleOffline
      );

    };

  }, []);

  useEffect(() => {

    const loadChats =
      async () => {

      const data =
        await getUsers();

      setChats(data);

    };

    loadChats();

  }, []);

  return (

    <div className="h-screen bg-[#FFF7FB] text-[#2D2D2D]">

      <div className="max-w-[1440px] mx-auto flex h-full w-full px-6 py-8">

        <div className="flex h-full w-full gap-8">

          <aside className="w-[320px] flex-none h-full rounded-[36px] bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_30px_80px_rgba(205,180,255,0.18)] p-6 flex flex-col">

            {/* профиль */}

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-4">

                <div className="h-14 w-14 rounded-full overflow-hidden bg-[#CDB4FF] shadow-[0_12px_30px_rgba(205,180,255,0.25)]">

                  {user?.avatar ? (

                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="h-full w-full grid place-items-center text-white font-bold">

                      {user?.name?.charAt(0)?.toUpperCase() || 'G'}

                    </div>

                  )}

                </div>

                <div className="min-w-0">

                  <p className="text-sm text-[#8E8E93]">

                    Welcome back

                  </p>

                  <p className="text-lg font-semibold text-[#2D2D2D] truncate">

                    {user
                      ? user.name || 'User'
                      : 'Guest'}

                  </p>

                  {user && (

                    <p className="text-xs text-[#8E8E93] truncate">

                      {user.email}

                    </p>

                  )}

                </div>

              </div>

              <button
                onClick={() =>
                  navigate('/settings')
                }
                className="rounded-2xl border border-[#E9D7FF] bg-white px-4 py-2 text-sm font-semibold text-[#2D2D2D] shadow-sm transition hover:bg-[#FFC8DD]/80"
              >
                Settings
              </button>

            </div>

            {/* поиск */}

            <div className="mb-6">

              <input
                type="text"
                placeholder="Search chats"
                value={search}
                onChange={(e)=>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full rounded-3xl border border-[#E9D7FF] bg-[#FFF7FB] px-5 py-3 text-sm outline-none transition focus:border-[#CDB4FF]"
              />

            </div>

            {/* чат список */}

            <div className="flex items-center gap-2 mb-4">

              <h3 className="text-sm font-semibold">

                Chats

              </h3>

              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-[#CDB4FF] text-xs text-white">

                {chatsCount}

              </span>

            </div>

            <div className="space-y-4 overflow-y-auto">

              {filteredChats.map(
                (chat) => (

                <NavLink
                  key={chat.id}
                  to={`/chat/${chat.id}`}
                  className={({
                    isActive
                  }) =>

                    `group flex items-center gap-4 rounded-3xl px-4 py-4 transition-all duration-300 ${
                      isActive
                      ? 'bg-[#CDB4FF]/20'
                      : 'bg-white hover:bg-[#F7E8FF]'
                    }`

                  }
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-full overflow-hidden bg-[#FFC8DD]">

                    {chat.avatar ? (

                      <img
                        src={chat.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <span>

                        {chat.name?.charAt(0)}

                      </span>

                    )}

                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <p className="font-semibold">

                        {chat.name}

                      </p>

                      <span
                        className={`text-xs ${
                          chat.status ===
                          'online'
                          ? 'text-[#24C48A]'
                          : 'text-[#8E8E93]'
                        }`}
                      >

                        {chat.status}

                      </span>

                    </div>

                  </div>

                </NavLink>

              ))}

            </div>

          </aside>

          <main className="flex-1 h-full rounded-[36px] bg-white shadow-[0_30px_70px_rgba(205,180,255,0.12)] overflow-hidden">

            {children}

          </main>

        </div>

      </div>

    </div>

  );

}