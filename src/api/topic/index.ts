import { useAxios } from '@/hooks';

import type {
  OperateGroup,
  OperateTopicWithOption,
  RelatedTopic,
  Topic,
  TopicGroup,
  TopicGroupListParams,
  TopicGroupListResult,
  TopicListParams,
  TopicListResult,
  TopicOption,
} from './interface';

enum Api {
  TopicList = '/topic/list',
  CreateTopic = '/topic/create',
  UpdateTopic = '/topic/update',
  DeleteTopic = '/topic/delete',
  DeleteTopicOption = '/topicOption/delete',
  TopicGroupList = '/topicGroup/list',
  CreateTopicGroup = '/topicGroup/create',
  UpdateTopicGroup = '/topicGroup/update',
  DeleteTopicGroup = '/topicGroup/delete',
  RelatedTopicWithGroup = '/topicGroup/relatedTopic',
}

export const getTopicList = (params: TopicListParams) => {
  return useAxios.get<SuccessResponse<TopicListResult>>({ url: Api.TopicList, params });
};

export const createTopic = (params: OperateTopicWithOption) => {
  return useAxios.post<SuccessResponse<Topic>>({ url: Api.CreateTopic, data: params });
};

export const updateTopic = (params: OperateTopicWithOption) => {
  return useAxios.post<SuccessResponse<Topic>>({ url: Api.UpdateTopic, data: params });
};

export const deleteTopic = (params: OperateTopicWithOption) => {
  return useAxios.delete<SuccessResponse<Topic>>({ url: Api.DeleteTopic, data: params });
};

export const deleteTopicOption = (params: OperateParams) => {
  return useAxios.delete<SuccessResponse<TopicOption>>({ url: Api.DeleteTopicOption, data: params });
};

export const getTopicGroupList = (params: TopicGroupListParams) => {
  return useAxios.get<SuccessResponse<TopicGroupListResult>>({ url: Api.TopicGroupList, params });
};

export const createTopicGroup = (params: OperateGroup) => {
  return useAxios.post<SuccessResponse<TopicGroup>>({ url: Api.CreateTopicGroup, data: params });
};

export const updateTopicGroup = (params: OperateGroup) => {
  return useAxios.post<SuccessResponse<TopicGroup>>({ url: Api.UpdateTopicGroup, data: params });
};

export const deleteTopicGroup = (params: OperateGroup) => {
  return useAxios.delete<SuccessResponse<TopicGroup>>({ url: Api.DeleteTopicGroup, data: params });
};

export const relatedTopicWithGroup = (params: RelatedTopic) => {
  return useAxios.post<SuccessResponse<string>>({ url: Api.RelatedTopicWithGroup, data: params });
};
