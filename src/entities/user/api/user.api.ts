import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { baseApi } from '@/shared/api/base';
import { UpdateProfileRequest, UserMeResponse } from '../model/types';

export const userApi = {
  getMe: async () => {
    const response = await baseApi.get<UserMeResponse>('/api/v1/users/me');
    return response.data;
  },

  updateProfile: async ({ nickname, profileImage }: UpdateProfileRequest) => {
    const formData = new FormData();
    if (nickname) formData.append('nickname', nickname);
    if (profileImage) formData.append('profileImage', profileImage);

    const response = await baseApi.patch<UserMeResponse>('/api/v1/users/me', formData);
    return response.data;
  },
};

export const useUserMe = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: userApi.getMe,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
    retry: (failureCount, error: unknown) => {
      // 401 에러면 재시도하지 않음 (인증 문제)
      if ((error as { response?: { status?: number } })?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
