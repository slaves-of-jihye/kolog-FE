import axios from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
  };
}

export const loginApi = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(
    'https://kolog-be.parafara.cloud/api/v1/users/login',
    body,
  );
  return data;
};
