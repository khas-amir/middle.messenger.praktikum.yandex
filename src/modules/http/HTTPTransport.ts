import { queryStringify } from "../../utils/helpers/queryStringify";

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export type Options = {
  method: Method;
  mode?: RequestMode,
  headers?: HeadersInit,
  credentials?: RequestCredentials,
  data?: any;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {

  baseUrl: string

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const query = options.data ? queryStringify(options.data) : '';
    return this.request(this.baseUrl + url + query, { ...options, method: Method.GET, data: query});
  }

  post(url: string, options: OptionsWithoutMethod):Promise<XMLHttpRequest> {
    return this.request(this.baseUrl + url, {...options, method: Method.POST});
  }

  put(url: string, options: OptionsWithoutMethod):Promise<XMLHttpRequest> {
    return this.request(this.baseUrl + url, {...options, method: Method.PUT})
  }

  request(url: string, options: Options = { method: Method.GET }, timeout = 5000): Promise<XMLHttpRequest> {
    const { method, data, headers } = options;
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();


      xhr.open(method, url);

      Object.keys(headers).forEach(optionKey => {
        xhr.setRequestHeader(optionKey, headers[optionKey])
      })

      if (options.credentials) {
        xhr.withCredentials = true;
      }


      xhr.timeout = timeout;
      xhr.onload = function () {
        resolve(xhr);
      };


      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    })
  }
}