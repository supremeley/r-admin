import { defHttp } from '@/utils/http';

import { LoginParams, LoginResponse } from './sys.type';

enum Api {
  Login = '/login',
}

export const login = (params: LoginParams) => {
  return defHttp.post<SuccessResponse<LoginResponse>>({ url: Api.Login, data: params }, { needToken: false });
};
