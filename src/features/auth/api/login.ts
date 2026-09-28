import { baseApi } from '@/shared/api/base';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginApi = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await baseApi.post<LoginResponse>('/api/v1/users/login', body);
  return data;
};
