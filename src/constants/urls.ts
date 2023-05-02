export const baseUrl = typeof window !== 'undefined' ? window.origin : process.env.BASE_URL || '';

export const apiUrls = {
  auth: {
    registration: '/api/auth/registration',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    profile: '/api/auth/profile',
    currentUser: '/api/auth/currentUser',
  },
};

export const publicUrls = {
  home: '/',
  error: '/404',
  login: '/login',
  about: '/about',
};
