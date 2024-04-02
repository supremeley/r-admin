import { Evaluation } from '@/api/evaluation/interface';
import type { ExamTopic } from '@/api/exam/interface';
import type { Topic, TopicOption } from '@/api/topic/interface';

export interface ExamTableModel {
  id: number;
  evaluation: Evaluation;
  evaluationName: string;
  createTime: string;
  evaluationTypeText: string;
  describe?: string;
  remark?: string;
}

export interface UserAnswer {
  selected?: boolean;
  remark?: string;
}

export type UserAnswerOption = UserAnswer & TopicOption;

export type ExamTopicWithAnswer = ExamTopic &
  Partial<Topic> & {
    userAnswer?: UserAnswerOption[] | string | undefined;
  };

export interface ExamRecordTableModel {
  id: number;
  userId: number;
  username: string;
  createTime: string;
  // evaluationTypeText: string;
  // describe?: string;
  // remark?: string;
}
