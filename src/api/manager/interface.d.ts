export interface Manager {
  id: number;
  username: string;
  mobile: number;
  gender: number;
  type: number;
  status: boolean;
  describe: string;
  remark: string;
}

export type ManagerListParams = ListParams & Partial<ManagerFilter>;

export interface ManagerDetailParams {
  id: number;
}

export type ManagerListResult = ListResult<Manager>;

export type CreateManager = Partial<Omit<Manager, 'id'>>;

export type OperateManagerResult = Partial<Manager> & { id: number };

export interface ManagerFilter {
  username: string;
  mobile: number;
  gender: number;
  type: number;
  status: boolean;
}
