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
    code: ResponseCode;
  }

  interface SuccessResponse<T = unknown> extends ResponseData {
    code: Exclude<ResponseCode, ResponseFailCode>;
    result: T;
  }

  interface ListParams {
    page: number;
    limit: number;
  }

  interface ListResult<T = unknown> {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    list: T[];
  }

  type ResponseFailCode = 500;

  type ResponseSuccessCode = 200;

  type ResponseCode = ResponseSuccessCode | 401 | 403 | 404 | ResponseFailCode;
}
