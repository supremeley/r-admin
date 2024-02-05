import type { AxiosRequestConfig } from 'axios';

// import { ResultEnum } from '@/enums/httpEnum';

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
    code: 200;
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
}
