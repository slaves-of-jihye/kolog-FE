'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signupApi, type SignupRequest } from '../api/signup';

const ERROR_MESSAGES: Record<number, string> = {
  409: '이미 사용 중인 이메일입니다.',
  400: '이메일 또는 비밀번호 형식이 올바르지 않습니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

interface UseSignupMutationOptions {
  onApiError: (message: string) => void;
}

export const useSignupMutation = ({ onApiError }: UseSignupMutationOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: SignupRequest) => signupApi(body),
    onSuccess: ({ data }) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
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
