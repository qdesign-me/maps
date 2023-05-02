import { publicUrls } from '@/constants/urls';

const URL_KEY = 'urlToRestore';
const REDIRECT_ON_FAIL_KEY = 'redirectOnFail';

export default class UrlRestoringService {
  static setUrl(url: string) {
    sessionStorage.setItem(URL_KEY, url);
  }

  static getUrl() {
    const url = sessionStorage.getItem(URL_KEY);
    sessionStorage.removeItem(URL_KEY);

    return url || publicUrls.home;
  }

  static setRedirectUrl(url: string) {
    sessionStorage.setItem(REDIRECT_ON_FAIL_KEY, url);
  }

  static getRedirectUrl() {
    const url = sessionStorage.getItem(REDIRECT_ON_FAIL_KEY);
    sessionStorage.removeItem(REDIRECT_ON_FAIL_KEY);

    return url || publicUrls.login;
  }
}
