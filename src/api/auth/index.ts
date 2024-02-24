import { useAxios } from '@/hooks';

import type { LoginParams, LoginResponse } from './interface';

enum Api {
  Login = '/auth/login',
}

export const login = (params: LoginParams) => {
  return useAxios.post<SuccessResponse<LoginResponse>>({ url: Api.Login, data: params }, { needToken: false });
};
