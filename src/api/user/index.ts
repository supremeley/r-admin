import { useAxios } from '@/hooks/useAxios';

import type { User, UserListParams } from './interface';

enum Api {
  UserList = '/user/list',
}

export const getUserList = (params: UserListParams) => {
  return useAxios.post<SuccessResponse<User[]>>({ url: Api.UserList, data: params }, { needToken: false });
};
