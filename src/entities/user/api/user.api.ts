import { useMutation, useQuery } from '@tanstack/react-query';
import { baseApi } from '@/shared/api/base';
import { UpdateProfileRequest, UserProfileResponse } from '../model/types';

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return {
    Authorization: `Bearer ${token ?? ''}`,
  };
};

export const userApi = {
  getProfile: async () => {
    const response = await baseApi.get<UserProfileResponse>('/api/v1/users/profile', {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  updateProfile: async ({ nickname, profileImage }: UpdateProfileRequest) => {
    const formData = new FormData();
    if (nickname) formData.append('nickname', nickname);
    if (profileImage) formData.append('profileImage', profileImage);

    const response = await baseApi.patch<UserProfileResponse>('/api/v1/users/profile', formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: userApi.getProfile,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
    retry: (failureCount, error: unknown) => {
      // 403 에러면 재시도하지 않음 (인증 문제)
      if ((error as { response?: { status?: number } })?.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userApi.updateProfile(data),
  });
};
