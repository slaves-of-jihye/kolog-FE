'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loginApi, type LoginRequest } from '../api/login';
import { saveAuthSession } from './saveAuthSession';

const ERROR_MESSAGES: Record<number, string> = {
  401: '이메일 또는 비밀번호가 올바르지 않습니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

interface UseLoginMutationOptions {
  onApiError: (message: string) => void;
}

export const useLoginMutation = ({ onApiError }: UseLoginMutationOptions) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: LoginRequest) => loginApi(body),
    onSuccess: (tokens) => {
      saveAuthSession(tokens);
      router.push('/');
    },
    onError: (error: unknown) => {
      const status = axios.isAxiosError(error) ? (error.response?.status ?? 500) : 500;
      onApiError(ERROR_MESSAGES[status] ?? ERROR_MESSAGES[500]);
    },
  });
};
