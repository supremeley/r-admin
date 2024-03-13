import type { EvaluationWithTopic } from '../evaluation/interface';

export interface Exam {
  createTime: string;
  evaluation: EvaluationWithTopic;
  evaluationId: number;
  examTopicList: ExamTopic[];
  id: number;
}

export interface ExamTopic {
  createTime: string;
  describe: string;
  name: string;
  type: number;
  answerList: Answer[];
  topicId: number;
  examId: number;
  id: number;
}

export interface Answer {
  createTime: string;
  topicInputted: boolean;
  optionInputted: boolean;
  name: string;
  remark: string;
  // selected: boolean;
  updateTime: string;
  topicOptionId: number;
  examTopicId: number;
  topicId: number;
  id: number;
}

export interface ExamFilter {
  name: string;
  // type: number;
  // status: boolean;
}

export type ExamListResult = ListResult<Exam>;

export interface DetailParams {
  id: number;
}

export type ExamDetailResult = Exam;
