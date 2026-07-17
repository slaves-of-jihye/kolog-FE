import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const { data } = await axios.post<LoginResponse>(`${API_BASE_URL}/api/v1/users/login`, body);
  return data;
};
