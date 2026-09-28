type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const saveAuthSession = ({ accessToken, refreshToken }: AuthTokens) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  try {
    const encodedPayload = accessToken.split('.')[1];
    const payload = JSON.parse(atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.sub) {
      localStorage.setItem('userId', String(payload.sub));
    } else {
      localStorage.removeItem('userId');
    }
  } catch {
    localStorage.removeItem('userId');
  }

  window.dispatchEvent(new Event('storage'));
};
