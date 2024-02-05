export interface Evaluation {
  name: string;
  type: string;
  status: number;
  sortNo: number;
  describe: string;
  remark: string;
  id: number;
}

export type EvaluationListParams = ListParams &
  Partial<{
    name: string;
  }>;

export type EvaluationListResult = ListResult<Evaluation>;

export type CreateEvaluation = Partial<Omit<Evaluation, 'id'>>;

export type OperateEvaluationResult = Partial<Evaluation> & { id: number };
