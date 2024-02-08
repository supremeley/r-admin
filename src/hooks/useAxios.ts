import { AxiosRequest } from '@utils/http';

export function createAxios(opt?: Partial<AxiosRequest>) {
  return new AxiosRequest({
    baseURL: import.meta.env.VITE_APP_GLOBAL_API_URL as string,
    requestOptions: {
      needToken: true,
      needNotify: true,
    },
    ...opt,
  });
}

export const useAxios = createAxios();
