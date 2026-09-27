import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const PUBLIC_AUTH_PATHS = ['/api/v1/users/signup', '/api/v1/users/login', '/api/v1/users/refresh'];

const isPublicAuthRequest = (url?: string) =>
  !!url && PUBLIC_AUTH_PATHS.some((path) => url.includes(path));

const logout = () => {
  if (typeof window === 'undefined') return;
  const currentPath = window.location.pathname;
  const isAuthPage = currentPath === '/login' || currentPath === '/signup';
  if (isAuthPage) return;

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname');
  localStorage.removeItem('profileImage');
  window.location.href = '/login';
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available.');
      }
      const { data } = await refreshClient.post<{ accessToken: string }>('/api/v1/users/refresh', {
        refreshToken,
      });
      localStorage.setItem('accessToken', data.accessToken);
      window.dispatchEvent(new Event('storage'));
      return data.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

// 요청 인터셉터
baseApi.interceptors.request.use(
  (config) => {
    // FormData일 때는 Content-Type을 삭제하여 브라우저가 자동으로 설정하도록 함
    if (config.data instanceof FormData) {
      config.headers.delete('Content-Type');
    }

    // 저장된 access token을 모든 요청에 자동으로 부착
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 401 발생 시 refreshToken으로 액세스 토큰을 재발급받아 한 번 재시도한다
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      typeof window === 'undefined' ||
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isPublicAuthRequest(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
      return baseApi(originalRequest);
    } catch {
      console.error('인증 실패: 리프레시 토큰이 만료되었거나 유효하지 않습니다.');
      logout();
      return Promise.reject(error);
    }
  },
);
