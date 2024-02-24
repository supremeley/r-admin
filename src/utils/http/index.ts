import { Message } from '@arco-design/web-react';
import type {
  AxiosError,
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import qs from 'qs';

import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums';
import type { RootStore } from '@/store';

let store: unknown;

export const injectStore = (_store: unknown) => {
  store = _store;
};

export class AxiosRequest {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        config = this.requestInterceptors(config, this.options);

        return config;
      },
      (error) => {
        console.log('request', error);
        // TODO: Add request error hook

        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<ResponseData>) => {
        console.log('response success', res);
        const { data, config } = res;
        const { code, message } = data;

        if (code === ResultEnum.SUCCESS) {
          return res;
        } else {
          if (message) {
            return Promise.reject({ code, message });
          }

          return Promise.reject({
            message: '请求异常:' + JSON.stringify({ url: config.url, code, message }) || 'Error',
          });
        }
      },
      (error: AxiosError<ResponseData, SuccessResponse>) => {
        console.log('response error', error);
        const { config, response } = error;

        const { data } = response as AxiosResponse<ResponseData>;

        const { code, message } = data;

        // TODO: Add response error hook

        if (message) {
          return Promise.reject({ code, message });
        }

        return Promise.reject({
          message: '请求异常:' + JSON.stringify({ url: config?.url, code, message }),
        });
      },
    );
  }

  supportFormData(config: CreateAxiosOptions) {
    const headers = config.headers ?? this.options.headers;
    const contentType = (headers?.['Content-Type'] ?? headers?.['content-type']) as ContentTypeEnum;

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  requestInterceptors(config: InternalAxiosRequestConfig, options: CreateAxiosOptions) {
    const nHeaders = config.headers;

    const needToken = (config as CreateAxiosOptions).requestOptions!.needToken ?? options.requestOptions;

    if (needToken) {
      const auth = (store as RootStore).getState().auth;

      nHeaders.Authorization = auth.token;
    }

    const params = config.params || {};
    const data = config.data || {};

    Object.assign({}, config.params, config.data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      config.data = undefined;
    }

    if (config.method?.toUpperCase() === RequestEnum.POST || config.method?.toUpperCase() === RequestEnum.PUT) {
      config.data = Object.assign(data, params);
      config.params = undefined;
    }

    config.headers = nHeaders;

    return config;
  }

  handleNotify = ({ code, message }: { code: number; message: string }) => {
    // TODO:
    console.log('handleNotify', code, message);

    switch (code) {
      case 511:
        Message.error({
          content: message,
          onClose: () => {
            // TODO:
            window.location.href = '/login';
          },
        });
        break;
      default:
        Message.error({
          content: message,
        });
        break;
    }
  };

  get<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request(
      {
        ...config,
        method: 'GET',
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      },
      options,
    );
  }

  post<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = config;

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<unknown, AxiosResponse<SuccessResponse>>(conf)
        .then((res: AxiosResponse<SuccessResponse>) => {
          const { data } = res;

          // TODO: if (config.responseType === 'blob') {

          resolve(data as unknown as Promise<T>);
        })
        .catch((error: ResponseData) => {
          console.log(error);

          const needNotify = opt.needNotify!;

          if (needNotify) {
            this.handleNotify(error);
          }

          reject(error);
        });
    });
  }

  uploadFile<T = unknown>(
    config: AxiosRequestConfig,
    params: UploadFileParams,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<T> {
    const formData = new FormData();

    formData.append('file', params.file);

    return this.request({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
      onUploadProgress: onProgress,
    });
  }
}
