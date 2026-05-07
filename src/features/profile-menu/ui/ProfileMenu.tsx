'use client';

import { useState } from 'react';
import { LogOut, Pencil } from 'lucide-react';
import { ProfileEditModal } from './ProfileEditModal';

type ProfileMenuProps = {
  name?: string;
  onLogout?: () => void;
};

export const ProfileMenu = ({ name = '박하린', onLogout }: ProfileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        className="border-primary-300 size-8 shrink-0 overflow-hidden rounded-full border bg-gray-200"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="프로필 메뉴 열기"
      />

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />

          <div className="absolute top-10 right-0 z-50 overflow-hidden rounded-lg p-2.5 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
            {/* liquid glass background */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/50 backdrop-blur-xl" />
            {/* inner shadow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_7px_0_rgba(0,0,0,0.05)]" />

            <div className="relative flex flex-col gap-1.5">
              {/* profile row */}
              <div className="flex items-center gap-1.5">
                <div className="size-6 shrink-0 overflow-hidden rounded-full bg-gray-200" />
                <span className="w-[2.3125rem] text-[0.75rem] tracking-[0.015rem] text-gray-600">
                  {name}
                </span>
              </div>

              {/* menu items */}
              <div className="flex flex-col gap-1.5">
                <button
                  className="flex w-[7.5rem] items-center gap-1.5 rounded-xl px-[0.3125rem] py-0.5 text-left transition-colors hover:bg-white/60 active:bg-white/80"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsEditOpen(true);
                  }}
                >
                  <Pencil className="size-3.5 shrink-0 text-gray-600" strokeWidth={1.5} />
                  <span className="text-[0.75rem] tracking-[0.015rem] text-gray-600">
                    프로필 편집
                  </span>
                </button>

                <button
                  className="flex w-[7.5rem] items-center gap-1.5 px-[0.3125rem] py-0.5 text-left transition-colors hover:bg-white/60 active:bg-white/80"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout?.();
                  }}
                >
                  <LogOut className="size-3.5 shrink-0 text-gray-600" strokeWidth={1.5} />
                  <span className="text-[0.75rem] tracking-[0.015rem] text-gray-600">로그아웃</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isEditOpen && <ProfileEditModal initialName={name} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};
