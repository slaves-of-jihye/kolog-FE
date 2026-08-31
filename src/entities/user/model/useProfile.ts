'use client';

import { useState } from 'react';
import { useUserProfile } from '../api/user.api';
import { fixLocalhost } from '@/shared/lib/url';

/**
 * 사용자 프로필 정보를 제공하는 훅
 * React Query의 캐싱을 활용하여 전역에서 사용 가능
 */
export const useProfile = () => {
  const { data: profile, isLoading, error } = useUserProfile();

  // localStorage에서 초기 데이터 로드 (클라이언트에서만, lazy initializer 사용)
  const [localData] = useState<{
    userId: number;
    nickname: string;
    profileImage: string | undefined;
  }>(() => {
    if (typeof window === 'undefined') {
      return {
        userId: 0,
        nickname: '사용자',
        profileImage: undefined,
      };
    }
    return {
      userId: Number(localStorage.getItem('userId') || '0'),
      nickname: localStorage.getItem('nickname') || '사용자',
      profileImage: fixLocalhost(localStorage.getItem('profileImage')),
    };
  });

  // API에서 받은 데이터 우선, localStorage fallback
  const userId = profile?.data?.userId ?? localData.userId;
  const nickname = profile?.data?.nickname ?? localData.nickname;
  const profileImage = fixLocalhost(profile?.data?.profileImage) ?? localData.profileImage;
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
