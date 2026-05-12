'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loginApi, type LoginRequest } from '../api/login';

const ERROR_MESSAGES: Record<number, string> = {
  401: '이메일 또는 비밀번호가 올바르지 않습니다.',
  404: '존재하지 않는 계정입니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

interface UseLoginMutationOptions {
  onApiError: (message: string) => void;
}

export const useLoginMutation = ({ onApiError }: UseLoginMutationOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: LoginRequest) => loginApi(body),
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
