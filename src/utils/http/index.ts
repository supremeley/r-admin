import { Message } from '@arco-design/web-react';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import qs from 'qs';

import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/http';
import { getToken } from '@/hooks';

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

        // // if (method?.toUpperCase() === 'POST' || needDataInRequestBody) {
        // config.data = params || data;
        //   config.params = undefined;
        //   nHeaders['Content-Type'] = nHeaders['Content-Type'] || contentType.JSON;
        // }

        // if (method?.toUpperCase() === 'GET' && needJoinTime) {
        //   if (!isString(params)) {
        //     config.params = Object.assign(params || {}, joinTimestamp(false));
        //   } else {
        //     config.url = config.url + params + `${joinTimestamp(true)}`;
        //     config.params = undefined;
        //   }
        // }

        // config.headers = nHeaders;

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
        console.log('response', res);
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
        console.log('response', error);
        const { config, response } = error;

        const { data } = response as AxiosResponse<ResponseData>;

        const { code, message } = data;

        // TODO: Add response error hook
        // if (code === ResultEnum.SUCCESS) {

        // }

        if (message) {
          return Promise.reject({ code, message });
        }

        return Promise.reject({
          message: '请求异常:' + JSON.stringify({ url: config?.url, code, message }),
        });

        // return Promise.reject(error);
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
      const [token] = getToken();
      nHeaders.Authorization = token;
    }

    const params = config.params || {};
    const data = config.data || {};

    Object.assign({}, config.params, config.data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      // config.params = Object.assign(params, data);
      config.data = undefined;
    }

    if (config.method?.toUpperCase() === RequestEnum.POST || config.method?.toUpperCase() === RequestEnum.PUT) {
      config.data = Object.assign(data, params);
      config.params = undefined;
      // nHeaders['Content-Type'] = ContentTypeEnum.FORM_URLENCODED;
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
            // JumpToLogin();
            // return <JumpToLogin />
            // const [{ logout: authLogout }] = useAuth();
            // authLogout();
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
          const { config, data } = res;

          if (config.responseType === 'blob') {
            // TODO:
            // resolve(data);
          }

          resolve(data as unknown as Promise<T>);
        })
        .catch((error: ResponseData) => {
          // console.log(error);

          const needNotify = opt.needNotify!;

          if (needNotify) {
            this.handleNotify(error);
          }

          reject(error);
        });
    });
  }

  // uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams, callback?: UploadFileCallBack) {
  //   const formData = new FormData();
  //   formData.append('file', params.file);

  //   return this.axiosInstance.request<T>({
  //     ...config,
  //     method: 'POST',
  //     data: formData,
  //     headers: {
  //       'Content-Type': contentType.FORM_DATA,
  //     },
  //   });
  // }
}
