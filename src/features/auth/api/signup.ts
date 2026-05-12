import axios from 'axios';

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
  const { data } = await axios.post<SignupResponse>(
    'https://kolog-be.parafara.cloud/api/v1/users/signup',
    body,
  );
  return data;
};
