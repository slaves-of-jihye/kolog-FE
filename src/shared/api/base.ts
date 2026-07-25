import axios from 'axios';

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
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

// 응답 인터셉터
baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // 403 에러 (인증 실패) 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 403) {
      console.error('인증 실패: 토큰이 만료되었거나 유효하지 않습니다.');
      // 클라이언트 사이드에서만 실행하고, 이미 로그인/회원가입 페이지가 아닌 경우에만
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath === '/login' || currentPath === '/signup';

        if (!isAuthPage) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('nickname');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);
