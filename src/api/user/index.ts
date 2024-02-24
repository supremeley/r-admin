import { useAxios } from '@/hooks';

import type {
  CreateUser,
  OperateUserResult,
  User,
  UserDetailParams,
  UserListParams,
  UserListResult,
} from './interface';

enum Api {
  UserList = '/user/list',
  UserDetail = '/user/detail',
  CreateUser = '/user/create',
  UpdateUser = '/user/update',
  DeleteUser = '/user/delete',
}

export const getUserList = (params: UserListParams) => {
  return useAxios.get<SuccessResponse<UserListResult>>({ url: Api.UserList, data: params });
};

export const getUserDetail = (params: UserDetailParams) => {
  return useAxios.get<SuccessResponse<User>>({ url: Api.UserDetail, params });
};

export const createUser = (params: CreateUser) => {
  return useAxios.post<SuccessResponse<OperateUserResult>>({ url: Api.CreateUser, data: params });
};

export const updateUser = (params: OperateUserResult) => {
  return useAxios.post<SuccessResponse<OperateUserResult>>({ url: Api.UpdateUser, data: params });
};

export const deleteUser = (params: OperateUserResult) => {
  return useAxios.delete<SuccessResponse<OperateUserResult>>({ url: Api.DeleteUser, params });
};
