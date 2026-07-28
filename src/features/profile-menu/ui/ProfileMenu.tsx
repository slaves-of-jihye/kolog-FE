'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { LogOut, Pencil } from 'lucide-react';
import { Profile } from '@/shared/ui';
import { ProfileEditModal } from './ProfileEditModal';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';

type ProfileMenuProps = {
  name?: string;
  onLogout?: () => void;
};

export const ProfileMenu = ({ name, onLogout }: ProfileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { nickname, profileImage: userProfileImage } = useCurrentUser();
  // TODO: 백엔드 프로필 조회 API 403 이슈 해결 후 활성화
  // const { data: profile } = useUserProfile();
  // const displayName = name ?? profile?.data?.nickname ?? nickname ?? '사용자';
  // const profileImage = profile?.data?.profileImage ?? userProfileImage;
  const displayName = name ?? nickname ?? '사용자';
  const profileImage = userProfileImage
    ? userProfileImage
        .replace('http://localhost:8001', process.env.NEXT_PUBLIC_API_URL || '')
        .replace('http://localhost:8080', process.env.NEXT_PUBLIC_API_URL || '')
    : undefined;

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        className="shrink-0"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-controls="profile-menu"
        aria-label="프로필 메뉴 열기"
      >
        <Profile className="size-8" border src={profileImage} alt={displayName} />
      </button>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />

          <div
            id="profile-menu"
            role="menu"
            tabIndex={-1}
            className="absolute top-10 right-0 z-50 overflow-hidden rounded-lg p-2.5 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]"
          >
            {/* liquid glass background */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/50 backdrop-blur-xl" />
            {/* inner shadow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_7px_0_rgba(0,0,0,0.05)]" />

            <div className="relative flex flex-col gap-1.5">
              {/* profile row */}
              <div className="flex items-center gap-1.5">
                <Profile className="size-6" src={profileImage} alt={displayName} />
                <span
                  className="w-[2.3125rem] text-[0.75rem] tracking-[0.015rem] text-gray-600"
                  suppressHydrationWarning
                >
                  {displayName}
                </span>
              </div>

              {/* menu items */}
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  role="menuitem"
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
                  type="button"
                  role="menuitem"
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

      {isEditOpen && (
        <ProfileEditModal initialName={displayName} onClose={() => setIsEditOpen(false)} />
      )}
    </div>
  );
};
