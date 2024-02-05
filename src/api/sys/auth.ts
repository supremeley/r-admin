import { useAxios } from '@/hooks/useAxios';

import type { LoginParams, LoginResponse } from './interface';

enum Api {
  Login = '/sys/login',
}

export const login = (params: LoginParams) => {
  return useAxios.post<SuccessResponse<LoginResponse>>({ url: Api.Login, data: params }, { needToken: false });
};
