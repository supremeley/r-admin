import { useAxios } from '@/hooks/useAxios';

import type {
  CreateEvaluation,
  EvaluationListParams,
  EvaluationListResult,
  OperateEvaluationResult,
} from './interface';

enum Api {
  EvaluationList = '/evaluation/list',
  CreateEvaluation = '/evaluation/create',
  UpdateEvaluation = '/evaluation/update',
  DeleteEvaluation = '/evaluation/delete',
}

export const getEvaluationList = (params: EvaluationListParams) => {
  return useAxios.get<SuccessResponse<EvaluationListResult>>({ url: Api.EvaluationList, params }, { needToken: false });
};

export const createEvaluation = (params: CreateEvaluation) => {
  return useAxios.post<SuccessResponse<OperateEvaluationResult>>(
    { url: Api.CreateEvaluation, data: params },
    { needToken: false },
  );
};

export const updateEvaluation = (params: OperateEvaluationResult) => {
  return useAxios.post<SuccessResponse<OperateEvaluationResult>>(
    { url: Api.UpdateEvaluation, data: params },
    { needToken: false },
  );
};

export const deleteEvaluation = (params: OperateEvaluationResult) => {
  return useAxios.delete<SuccessResponse<OperateEvaluationResult>>(
    { url: Api.DeleteEvaluation, data: params },
    { needToken: false },
  );
};
