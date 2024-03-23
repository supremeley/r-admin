import { EvaluationTagEnum, EvaluationTypeEnum } from '@/enums';

import { TopicGroupWithTopic, TopicWithOption } from '../topic/interface';

export interface Evaluation {
  name: string;
  tag: EvaluationTagEnum;
  type: EvaluationTypeEnum;
  status: boolean;
  sortNo: number;
  mode: number;
  describe: string;
  remark: string;
  id: number;
}

export interface EvaluationWithTopic extends Evaluation {
  topicList: TopicWithOption[];
  topicGroupList: TopicGroupWithTopic[];
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
