import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
    };
  };
}

export const signupApi = async (body: SignupRequest): Promise<SignupResponse> => {
  const { data } = await axios.post<SignupResponse>(`${API_BASE_URL}/api/v1/users/signup`, body);
  return data;
};
