const COMMON = {
  SERVER_IS_NOT_RESPONDING: 'Server is not responding',
  UNAUTHORIZED: 'You are not authorized',
  FORBIDDEN: 'You are not authorized to perform this operation!',
  NOT_FOUND: 'Page not found',
};
const AUTH = {
  INVALID_DATA: 'Enter valid Email and Password',
  EMPTY_DATA: 'Provide Email or Password!',
};

export const STATUS_CODE: Record<string, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

export const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  COMMON,
  AUTH,
};

export const MAPPING_ERROR_STATUS_CODE_AND_ERROR_DATA: Record<number, Record<string, string>> = {
  [STATUS_CODE.UNAUTHORIZED]: {
    message: COMMON.UNAUTHORIZED,
  },
  [STATUS_CODE.FORBIDDEN]: {
    message: COMMON.FORBIDDEN,
  },
  [STATUS_CODE.NOT_FOUND]: {
    message: COMMON.NOT_FOUND,
  },
};
