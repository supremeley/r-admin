import { useAxios } from '@/hooks';

import type {
  CreateManager,
  Manager,
  ManagerDetailParams,
  ManagerListParams,
  ManagerListResult,
  ManagerRecordListResult,
  OperateManagerResult,
} from './interface';

enum Api {
  ManagerList = '/admin/list',
  ManagerDetail = '/admin/detail',
  CreateManager = '/admin/create',
  UpdateManager = '/admin/update',
  DeleteManager = '/admin/delete',
  ManagerRecord = '/admin/record',
}

export const getManagerList = (params: ManagerListParams) => {
  return useAxios.get<SuccessResponse<ManagerListResult>>({ url: Api.ManagerList, params });
};

export const getManagerDetail = (params: ManagerDetailParams) => {
  return useAxios.get<SuccessResponse<Manager>>({ url: Api.ManagerDetail, params });
};

export const createManager = (params: CreateManager) => {
  return useAxios.post<SuccessResponse<OperateManagerResult>>({ url: Api.CreateManager, data: params });
};

export const updateManager = (params: OperateManagerResult) => {
  return useAxios.post<SuccessResponse<OperateManagerResult>>({ url: Api.UpdateManager, data: params });
};

export const deleteManager = (params: OperateManagerResult) => {
  return useAxios.delete<SuccessResponse<OperateManagerResult>>({ url: Api.DeleteManager, params });
};

export const getManagerRecord = (params: ListParams) => {
  return useAxios.get<SuccessResponse<ManagerRecordListResult>>({ url: Api.ManagerRecord, params });
};
