import type { AxiosRequestConfig } from 'axios';

declare global {
  interface CreateAxiosOptions extends AxiosRequestConfig {
    requestOptions?: RequestOptions;
  }

  type RequestOptions = Partial<{
    needToken: boolean;
    needNotify: boolean;
  }>;

  interface ResponseData {
    message: string;
    code: number;
  }

  interface SuccessResponse<T = unknown> extends ResponseData {
    data: T;
  }
}
