import { isValueEmpty } from '@/utils/common';
import { apiUrls, publicUrls } from '@/constants/urls';
import { ERROR_MESSAGES } from '@/constants/errors';
import request from './request.service';
import UrlRestoringService from './urlRestoring.service';
import { ILoginFunctionProps, IRegisterFunctionProps } from '@/types/request';
import { Roles, User } from '@/stores/auth';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key: string) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearTokens() {
    auth.clear(ACCESS_TOKEN_KEY);
    auth.clear(REFRESH_TOKEN_KEY);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key: string) {
    const localStorageItem = localStorage.getItem(key);
    const sessionStorageItem = sessionStorage.getItem(key);

    if (localStorage && localStorageItem !== null) {
      return parse(localStorageItem) || null;
    }

    if (sessionStorage && sessionStorageItem) {
      return parse(sessionStorageItem) || null;
    }

    return null;
  },
  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value: string | object, key: string, isLocalStorage: boolean) {
    if (isValueEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  getAccessToken() {
    return auth.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return auth.get(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(value = '', isLocalStorage = true) {
    return auth.set(value, REFRESH_TOKEN_KEY, isLocalStorage);
  },

  setAccessToken(value = '', isLocalStorage = true) {
    return auth.set(value, ACCESS_TOKEN_KEY, isLocalStorage);
  },

  async login({ username = null, password = null }: ILoginFunctionProps): Promise<void> {
    if (!username || !password) {
      throw new Error(ERROR_MESSAGES.AUTH.EMPTY_DATA);
    }
    auth.clearTokens();

    const result = await request(apiUrls.auth.login, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then(response => response.json());

    auth.setAccessToken(result.accessToken);
    auth.setRefreshToken(result.refreshToken);

    window.location.href = UrlRestoringService.getUrl();
  },

  async register({ username = null, password = null }: IRegisterFunctionProps) {
    if (!username || !password) {
      throw new Error(ERROR_MESSAGES.AUTH.EMPTY_DATA);
    }
    auth.clearTokens();

    const result = await request(apiUrls.auth.login, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then(response => response.json());

    auth.setAccessToken(result.accessToken);
    auth.setRefreshToken(result.refreshToken);

    window.location.href = UrlRestoringService.getUrl();
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      // const result = await request(apiUrls.auth.currentUser, { method: 'GET' });
      const testPromise = new Promise<User>(resolve => {
        setTimeout(() => {
          const user: User = {
            firstName: 'John',
            lastName: 'Smith',
            roles: [Roles.ADMIN],
          };
          resolve(user);
        }, 2000);
      });

      return testPromise;

      // return (await result.json()) as User;

      // return { firstName: 'A', lastName: 'B', roles: [Roles.USER] } as User;
    } catch (err) {
      return null;
    }
  },

  async logout() {
    auth.clearTokens();

    await request(apiUrls.auth.logout, {
      method: 'POST',
    });

    window.location.href = publicUrls.login;
  },
};

export default auth;
