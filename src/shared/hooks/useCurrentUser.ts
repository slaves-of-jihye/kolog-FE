import { useState } from 'react';

export interface CurrentUser {
  userId: string | null;
  nickname: string | null;
}

const getInitialUser = (): CurrentUser => {
  if (typeof window === 'undefined') {
    return { userId: null, nickname: null };
  }
  return {
    userId: localStorage.getItem('userId'),
    nickname: localStorage.getItem('nickname'),
  };
};

export const useCurrentUser = (): CurrentUser => {
  const [user] = useState<CurrentUser>(getInitialUser);
  return user;
};
