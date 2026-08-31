'use client';

import { useUserProfile } from '../api/user.api';
import { fixLocalhost } from '@/shared/lib/url';

/**
 * 사용자 프로필 정보를 제공하는 훅
 * React Query의 캐싱을 활용하여 전역에서 사용 가능
 */
export const useProfile = () => {
  const { data: profile, isLoading, error } = useUserProfile();

  // API에서 받은 데이터 우선
  const userId = profile?.data?.userId ?? 0;
  const nickname = profile?.data?.nickname ?? '사용자';
  const profileImage = fixLocalhost(profile?.data?.profileImage);
  const email = profile?.data?.email ?? null;

  return {
    userId,
    nickname,
    profileImage,
    email,
    isLoading,
    error,
  };
};
