import 'whatwg-fetch';
import { configureRefreshFetch, fetchJSON } from './refresh-fetch';
// import merge from 'lodash/merge';
import auth from './auth.service';
import { baseUrl, apiUrls } from '@/constants/urls';
import { ParamValueType, RequestOptions, ResponseError } from '@/types/request';

const convertParamArray = (key: string, paramArray: Array<ParamValueType>) => {
  let paramStr = '';
  paramArray.forEach(param => {
    paramStr = paramStr + key + '[]=' + encodeValue(param) + '&';
  });
  return paramStr;
};

const encodeValue = (value: ParamValueType) => {
  if (typeof value === 'object') {
    return encodeURIComponent(JSON.stringify(value));
  }

  return encodeURIComponent(value);
};

const formatQueryParams = (params: Record<string, ParamValueType | ParamValueType[]>) =>
  Object.keys(params)
    .map(k => {
      const paramValue = params[k];
      return Array.isArray(paramValue)
        ? convertParamArray(encodeURIComponent(k), paramValue)
        : `${encodeURIComponent(k)}=${encodeValue(paramValue)}`;
    })
    .join('&');

const fetchJSONWithToken = (url: string, options: RequestOptions = {}): Promise<Response> => {
  // const token = auth.getAccessToken();

  const base = options.baseUrl || baseUrl;

  const isJson = options.isJson ?? true;
  const optionsWithToken = { ...options };
  // if (token != null) {
  //   optionsWithToken = merge({}, options, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  if (optionsWithToken && optionsWithToken.body && isJson) {
    optionsWithToken.body = JSON.stringify(optionsWithToken.body);
  }

  if (optionsWithToken && optionsWithToken.params) {
    const params = formatQueryParams(optionsWithToken.params);
    url = `${url}?${params}`;
  }

  return fetchJSON(base + url, optionsWithToken);
};

const shouldRefreshToken = (error: ResponseError) => {
  return error.response.status === 401;
};

const refreshToken = async () => {
  const currentRefreshToken = auth.getRefreshToken();
  auth.clearTokens();
  return fetchJSONWithToken(apiUrls.auth.refresh, {
    method: 'POST',
    body: { refreshToken: currentRefreshToken },
  })
    .then(response => response.json())
    .then(body => {
      auth.setRefreshToken(body.refreshToken);
    })
    .catch(error => {
      // Clear token and continue with the Promise catch chain
      auth.clearTokens();
      throw error;
    });
};

const request = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken,
});

export default request;
