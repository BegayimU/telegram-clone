import React from 'react';
import { ChevronRight, Bell, Lock, Eye, LogOut } from 'lucide-react';

export default function SettingsPage() {
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

  return (
    <div className="flex h-full flex-col bg-[#FFF7FB] p-6">
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

      <button
        type="button"
        className="w-full rounded-[24px] bg-white border border-[#FFE9E9] p-4 shadow-sm transition hover:shadow-[0_12px_30px_rgba(255,107,107,0.15)] hover:border-[#FFCCCC] text-left mt-auto"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-[#FFEAEA] p-3 text-[#FF6B6B]">
            <LogOut size={20} />
          </div>
          <div>
            <p className="font-semibold text-[#FF6B6B]">Logout</p>
            <p className="text-xs text-[#8E8E93]">Sign out from your account</p>
          </div>
        </div>
      </button>
    </div>
  );
}
