import { useState, useEffect } from 'react';

export interface CurrentUser {
  userId: string | null;
  nickname: string | null;
  profileImage: string | null;
}

export const useCurrentUser = (): CurrentUser => {
  const [user, setUser] = useState<CurrentUser>({
    userId: null,
    nickname: null,
    profileImage: null,
  });

  useEffect(() => {
    // 초기 로드 시 localStorage에서 읽기
    const updateUser = () => {
      setUser({
        userId: localStorage.getItem('userId'),
        nickname: localStorage.getItem('nickname'),
        profileImage: localStorage.getItem('profileImage'),
      });
    };

    updateUser();

    // storage 이벤트 리스너 추가 (다른 탭이나 수동 변경 감지)
    window.addEventListener('storage', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  return user;
};
