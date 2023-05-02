import { RequestOptions } from '@/types/request';
import request from './request.service';
import config from '@/config/index';

// @ts-ignore
import * as acst from '@acst/mono-missioninsite-apiservice';
// @ts-ignore
export { HelloRequest, HelloResponse } from '@acst/mono-missioninsite-apiservice';

const apiServiceCallWrapper = (url: string, body?: Uint8Array, config?: object): Promise<Uint8Array> => {
  const localConfig: RequestOptions = {
    method: 'POST',
    isJson: false,
    headers: {
      'content-type': 'application/protobuf',
    },
  };

  return request(url, { body, ...config, ...localConfig })
    .then(response => response.arrayBuffer())
    .then(buffer => new Uint8Array(buffer));
};

const apiServiceClient = new acst.ApiserviceClient(apiServiceCallWrapper, config.apiServiceUrl);
export default apiServiceClient;

// {
//   url: "http://127.0.0.1:12002";
// }
