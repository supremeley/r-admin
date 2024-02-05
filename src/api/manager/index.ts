import { useAxios } from '@/hooks/useAxios';

import type { LoginParams, LoginResponse } from './interface';

enum Api {
  ManagerList = '/admin/list',
}

export const getManagerList = (params: LoginParams) => {
  return useAxios.post<SuccessResponse<LoginResponse>>({ url: Api.ManagerList, data: params }, { needToken: false });
};
