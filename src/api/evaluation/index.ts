import { useAxios } from '@/hooks';

import type {
  CreateEvaluation,
  EvaluationListParams,
  EvaluationListResult,
  EvaluationrDetailParams,
  EvaluationWithTopic,
  OperateEvaluationResult,
} from './interface';

enum Api {
  EvaluationList = '/evaluation/list',
  EvaluationDetail = '/evaluation/detail',
  CreateEvaluation = '/evaluation/create',
  UpdateEvaluation = '/evaluation/update',
  DeleteEvaluation = '/evaluation/delete',
}

export const getEvaluationList = (params: EvaluationListParams) => {
  return useAxios.get<SuccessResponse<EvaluationListResult>>({ url: Api.EvaluationList, params });
};

export const getEvaluationDetail = (params: EvaluationrDetailParams) => {
  return useAxios.get<SuccessResponse<EvaluationWithTopic>>({ url: Api.EvaluationDetail, params });
};

export const createEvaluation = (params: CreateEvaluation) => {
  return useAxios.post<SuccessResponse<OperateEvaluationResult>>({ url: Api.CreateEvaluation, data: params });
};

export const updateEvaluation = (params: OperateEvaluationResult) => {
  return useAxios.post<SuccessResponse<OperateEvaluationResult>>({ url: Api.UpdateEvaluation, data: params });
};

export const deleteEvaluation = (params: OperateEvaluationResult) => {
  return useAxios.delete<SuccessResponse<OperateEvaluationResult>>({ url: Api.DeleteEvaluation, data: params });
};
