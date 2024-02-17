import { useAxios } from '@/hooks';

import type { OperateTopicOption, Topic } from './interface';

enum Api {
  CreateTopic = '/topic/create',
  UpdateTopic = '/topic/update',
  DeleteTopic = '/topic/delete',
}

export const createTopic = (params: OperateTopicOption) => {
  return useAxios.post<SuccessResponse<Topic>>({ url: Api.CreateTopic, data: params });
};

export const updateTopic = (params: OperateTopicOption) => {
  return useAxios.post<SuccessResponse<Topic>>({ url: Api.UpdateTopic, data: params });
};

export const deleteTopic = (params: OperateTopicOption) => {
  return useAxios.delete<SuccessResponse<Topic>>({ url: Api.DeleteTopic, data: params });
};
