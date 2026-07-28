'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProfileMenu } from '@/features/profile-menu';
import ArchiveIcon from '@/shared/assets/icons/archive.svg';

export const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileImage');
    // storage 이벤트 발생
    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image src="/logo.svg" alt="KOLOG 홈으로 이동" width={74} height={20} priority />
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/log/history" aria-label="보관함">
          <ArchiveIcon className="h-8 w-[2.125rem] shrink-0" />
        </Link>
        <ProfileMenu onLogout={handleLogout} />
      </div>
    </div>
  );
};
