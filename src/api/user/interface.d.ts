export interface User {
  name: string;
  type: string;
  status: number;
  sortNo: number;
  describe: string;
  remark: string;
  id: number;
}

export type UserListParams = ListParams & Partial<UserFilter>;

export interface UserFilter {
  name: string;
}
