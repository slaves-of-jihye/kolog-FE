'use client';

import { useUserMe } from '../api/user.api';
import { fixLocalhost } from '@/shared/lib/url';

/**
 * 사용자 프로필 정보를 제공하는 훅
 * React Query의 캐싱을 활용하여 전역에서 사용 가능
 */
export const useProfile = () => {
  const { data: profile, isLoading, error } = useUserMe();

  const userId = profile?.id ?? 0;
  const nickname = profile?.nickname ?? '사용자';
  const profileImage = fixLocalhost(profile?.profileImageUrl ?? undefined);

  return {
    userId,
    nickname,
    profileImage,
    isLoading,
    error,
  };
};
