import { defHttp } from '@/hooks/useAxios';

import { LoginParams, LoginResponse } from './sys.type';

enum Api {
  Login = '/sys/login',
}

export const login = (params: LoginParams) => {
  return defHttp.post<SuccessResponse<LoginResponse>>({ url: Api.Login, data: params }, { needToken: false });
};
