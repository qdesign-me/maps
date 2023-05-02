import { RequestOptions, ResponseError } from '@/types/request';

const fetchJSON = async (url: string, options: RequestOptions = {}): Promise<Response> => {
  return fetch(url, options as RequestInit).then(checkStatus);
};
const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new ResponseError(response.status, response);
  }
};

export default fetchJSON;
