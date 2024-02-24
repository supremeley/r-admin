export interface Evaluation {
  name: string;
  type: number;
  status: boolean;
  sortNo: number;
  describe: string;
  remark: string;
  id: number;
}

export interface EvaluationWithTopic extends Evaluation {
  topicList: Topic[];
}

export type EvaluationListParams = ListParams & Partial<EvaluationFilter>;

export interface EvaluationrDetailParams {
  id: number;
}

export type EvaluationListResult = ListResult<Evaluation>;

export type CreateEvaluation = Partial<Omit<Evaluation, 'id'>>;

export type OperateEvaluationResult = Partial<Evaluation> & { id: number };

export interface EvaluationFilter {
  name: string;
  type?: number;
}
