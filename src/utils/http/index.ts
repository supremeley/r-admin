import type {
  // AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  // AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import qs from 'qs';

// import { isString } from '/@/utils/is';
// import type {
//   CreateAxiosOptions,
//   RequestOptions,
//   ResponseData,
//   UploadFileCallBack,
//   UploadFileParams,
// } from '/#/request';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
// import { TOKEN_KEY } from '/@/config';
// import { useMessage } from '/@/hooks/web/useMessage';
import { getToken } from '@/hooks/useAuth';
// import { joinTimestamp } from './helper';

// const { notification } = useMessage();

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
        // console.log('this.options', this.options);
        // console.log('config', config);

        // const requestOptions = (config as unknown as CreateAxiosOptions).requestOptions ?? this.options.requestOptions;

        config = this.requestInterceptors(config, this.options);

        // const nHeaders = config.headers;

        // const needToken = true;

        // const opts: RequestOptions = { ...requestOptions };

        // console.log('opts', opts);

        // if (opts) {
        //   needToken = opts?.needToken as boolean;
        //   // needJoinTime = opts?.needJoinTime as boolean;
        //   // needDataInRequestBody = opts?.needDataInRequestBody as boolean;
        // }

        // if (needToken && getToken()) nHeaders[TOKEN_KEY] = getToken() as string;

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
        console.log(error);
        // this.handleNotify(error);

        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('response', res);
        // const { data, config } = res;
        // const { code, message } = data;
        // const { responseType } = config;

        // if (responseType === 'blob') {
        //   return { data };
        // }

        // if (requestCode.SUCCESS_CODE.includes(code)) {
        //   return { data };
        // } else {
        //   if (message) {
        //     return Promise.reject({ code, message });
        //   }

        //   return Promise.reject('请求异常:' + JSON.stringify({ url: config.url, code, message }) || 'Error');
        // }
        return res;
      },
      (error) => {
        console.log('response', error);

        // this.handleNotify(error);

        return Promise.reject(error);
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

    return config;
  }

  handleNotify = ({ code, message }: { code?: number; message?: string }) => {
    switch (code) {
      case 501:
        break;
      default:
        break;
    }

    if (message) {
      // notification.error({
      //   message: '错误提示',
      //   description: message,
      // });
    }

    // Promise.reject(JSON.stringify({ code, message }));
  };

  get<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
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
        .request<unknown, AxiosResponse<ResponseData>>(conf)
        .then((res: AxiosResponse<ResponseData>) => {
          // TODO: 后期补充hook

          // const needRequestOnlyResult = opts.needRequestOnlyResult as boolean;

          const { data: request } = res;

          // if (needRequestOnlyResult) {
          //   const {
          //     data: { result },
          //   } = res;

          //   request = result || request;
          // }

          resolve(request as unknown as Promise<T>);
        })
        .catch((error) => {
          console.log(error);
          // const needResultNotify = opts.needResultNotify as boolean;

          // if (needResultNotify) {
          //   this.handleNotify(error);
          // }

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
