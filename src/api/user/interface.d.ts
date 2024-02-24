export interface User {
  username: string;
  mobile: number;
  gender: number;
  type: string;
  status: boolean;
  birthday: string;
  // describe: string;
  // remark: string;
  id: number;
}

export type UserListParams = ListParams & Partial<UserFilter>;

export interface UserDetailParams {
  id: number;
}

export type UserListResult = ListResult<User>;

export type CreateUser = Partial<Omit<User, 'id'>>;

export type OperateUserResult = Partial<User> & { id: number };

export interface UserFilter {
  username: string;
  mobile: number;
  gender: number;
  type: number;
  status: boolean;
}
