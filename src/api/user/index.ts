import { useAxios } from '@/hooks/useAxios';

import type { LoginParams, LoginResponse } from './interface';

enum Api {
  UserList = '/user/list',
}

export const getUserList = (params: LoginParams) => {
  return useAxios.post<SuccessResponse<LoginResponse>>({ url: Api.UserList, data: params }, { needToken: false });
};
