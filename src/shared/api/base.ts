import axios from 'axios';

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 인터셉터 설정
baseApi.interceptors.request.use(
  (config) => {
    // FormData일 때는 Content-Type을 삭제하여 브라우저가 자동으로 설정하도록 함
    if (config.data instanceof FormData) {
      config.headers.delete('Content-Type');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
