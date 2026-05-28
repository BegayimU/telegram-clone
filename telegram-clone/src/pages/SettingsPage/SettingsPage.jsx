import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { ChevronRight, Bell, Lock, Eye, LogOut, User } from 'lucide-react';
import {
  updateUserStatus,
  getUsers,
  updateProfile
} from '../../services/userService';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

useEffect(() => {

  const loadUser = async () => {

    const currentUser =
      auth.currentUser;

    if (!currentUser) return;

    const users =
      await getUsers();

    const dbUser =
      users.find(
        (u) =>
          u.id === currentUser.uid
      );

    if (dbUser) {

      setUser(dbUser);

      setName(
        dbUser.name || ''
      );

      setAvatar(
        dbUser.avatar || ''
      );

    }

  };

  loadUser();

}, []);

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Logout failed. Please try again.');
      setLoading(false);
    }
  };

  const settings = [
    {
      id: 1,
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification settings',
    },
    {
      id: 2,
      icon: Lock,
      label: 'Privacy & Security',
      description: 'Control your privacy settings',
    },
    {
      id: 3,
      icon: Eye,
      label: 'Appearance',
      description: 'Customize your appearance',
    },
  ];

const handleSave = async () => {

  console.log('UID:', auth.currentUser.uid);

  console.log({
    name,
    avatar
  });

const success =
  await updateProfile(
    auth.currentUser.uid,
    {
      name,
      avatar
    }
  );

console.log(
  'saved:',
  success
);

if (success) {

  setUser({
    ...user,
    name,
    avatar
  });

  alert('Profile updated');

}

};

  return (
    <div className="flex h-full flex-col bg-[#FFF7FB] p-6">
      {/* Profile Section */}
      {user && (
        <div className="mb-8 rounded-[24px] bg-white border border-[#F1E4FF] p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F7E8FF] flex items-center justify-center flex-shrink-0">
              <User size={32} className="text-[#CDB4FF]" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-[#2D2D2D] truncate">
                {user.displayName || 'User'}
              </h2>
              <p className="text-sm text-[#8E8E93] truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 rounded-[24px] bg-white p-6 border border-[#F1E4FF]">

  <input
    value={name}
    onChange={(e)=>
      setName(e.target.value)
    }
    placeholder="Name"
    className="w-full border p-3 rounded-xl mb-3"
  />

  <input
    value={avatar}
    onChange={(e)=>
      setAvatar(e.target.value)
    }
    placeholder="Avatar URL"
    className="w-full border p-3 rounded-xl mb-3"
  />

  <button
    onClick={handleSave}
    className="
    rounded-2xl
    bg-[#CDB4FF]
    px-5
    py-3
    text-white
    font-medium
    transition-all
    duration-300
    hover:bg-[#b89dff]
    hover:scale-105
    hover:shadow-[0_10px_25px_rgba(205,180,255,0.4)]
    active:scale-95
    "
  >
    Save
  </button>

</div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#2D2D2D]">Settings</h1>
        <p className="mt-2 text-sm text-[#8E8E93]">Manage your account preferences</p>
      </div>

      <div className="space-y-3 flex-1">
        {settings.map((setting) => {
          const Icon = setting.icon;
          return (
            <button
              key={setting.id}
              type="button"
              className="w-full rounded-[24px] bg-white border border-[#F1E4FF] p-4 shadow-sm transition hover:shadow-[0_12px_30px_rgba(205,180,255,0.15)] hover:border-[#E9D7FF] text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-[#F7E8FF] p-3 text-[#CDB4FF]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2D2D]">{setting.label}</p>
                    <p className="text-xs text-[#8E8E93]">{setting.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#8E8E93]" />
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="rounded-[16px] bg-[#FFEAEA] border border-[#FFCCCC] p-3 mb-4">
          <p className="text-sm text-[#FF6B6B]">{error}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        disabled={loading}
        type="button"
        className="w-full rounded-[24px] bg-white border border-[#FFE9E9] p-4 shadow-sm transition hover:shadow-[0_12px_30px_rgba(255,107,107,0.15)] hover:border-[#FFCCCC] text-left mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-[#FFEAEA] p-3 text-[#FF6B6B]">
            <LogOut size={20} />
          </div>
          <div>
            <p className="font-semibold text-[#FF6B6B]">
              {loading ? 'Signing out...' : 'Logout'}
            </p>
            <p className="text-xs text-[#8E8E93]">Sign out from your account</p>
          </div>
        </div>
      </button>
    </div>
  );
}
