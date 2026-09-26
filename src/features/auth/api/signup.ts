import { baseApi } from '@/shared/api/base';

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  accessToken: string;
  refreshToken: string;
}

export const signupApi = async (body: SignupRequest): Promise<SignupResponse> => {
  const { data } = await baseApi.post<SignupResponse>('/api/v1/users/signup', body);
  return data;
};
