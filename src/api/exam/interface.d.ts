import { TopicTypeEnum } from '@/enums';

import type { EvaluationWithTopic } from '../evaluation/interface';
import type { Topic } from '../topic/interface';
import type { User } from '../user/interface';

export interface Exam {
  createTime: string;
  evaluation: EvaluationWithTopic;
  evaluationId: number;
  examTopicList: ExamTopic[];
  userId: number;
  id: number;
  user: User;
}

export interface ExamTopic {
  createTime: string;
  describe: string;
  name: string;
  type: TopicTypeEnum;
  answerList: Answer[];
  topicId: number;
  topic: Topic;
  examId: number;
  id: number;
  topicId: number;
  topicGroupId: number;
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
