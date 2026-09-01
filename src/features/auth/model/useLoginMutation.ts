'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loginApi, type LoginRequest } from '../api/login';
import { userApi } from '@/entities/user/api/user.api';

const ERROR_MESSAGES: Record<number, string> = {
  401: '이메일 또는 비밀번호가 올바르지 않습니다.',
  404: '존재하지 않는 계정입니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

// JWT 토큰 디코딩 (간단한 base64 디코딩)
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

interface UseLoginMutationOptions {
  onApiError: (message: string) => void;
}

export const useLoginMutation = ({ onApiError }: UseLoginMutationOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: LoginRequest) => loginApi(body),
    onSuccess: async ({ data }) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // JWT 토큰에서 userId 추출
      const payload = decodeJwt(data.accessToken);
      if (payload && payload.sub) {
        localStorage.setItem('userId', payload.sub);
      }

      // 프로필 API 호출하여 사용자 정보 가져오기
      try {
        const profileResponse = await userApi.getProfile();
        if (profileResponse.data) {
          localStorage.setItem('nickname', profileResponse.data.nickname);
          if (profileResponse.data.profileImage) {
            localStorage.setItem('profileImage', profileResponse.data.profileImage);
          }
          // localStorage 변경 이벤트 발생
          window.dispatchEvent(new Event('storage'));
        }
      } catch (error) {
        // 프로필 조회 실패 시 로그에서 닉네임 찾기 (fallback)
        console.error('Failed to fetch user profile, trying logs:', error);
        try {
          const today = new Date();
          const userId = Number(payload?.sub);

          // 최근 7일간의 로그를 확인하여 닉네임 찾기
          for (let i = 0; i < 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const date = `${checkDate.getMonth() + 1}-${checkDate.getDate()}`;

            try {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/logs/${date}`,
                {
                  headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                  },
                },
              );
              const logs = response.data?.data || [];

              // 이 날짜의 로그에서 사용자의 로그 찾기
              for (const hourLog of logs) {
                const myLog = hourLog.logs?.find(
                  (log: { userId: number; nickname?: string; profileImage?: string }) =>
                    log.userId === userId,
                );
                if (myLog?.nickname) {
                  localStorage.setItem('nickname', myLog.nickname);
                  if (myLog.profileImage) {
                    localStorage.setItem('profileImage', myLog.profileImage);
                  }
                  // localStorage 변경 이벤트 발생
                  window.dispatchEvent(new Event('storage'));
                  break;
                }
              }
            } catch {
              // 해당 날짜에 로그가 없으면 다음 날짜 확인
              continue;
            }
          }
        } catch (e) {
          console.error('Failed to fetch user info from logs:', e);
        }
      }

      router.push('/');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 500;
        const message = ERROR_MESSAGES[status] ?? ERROR_MESSAGES[500];
        onApiError(message);
        return;
      }
      onApiError(ERROR_MESSAGES[500]);
    },
  });
};
