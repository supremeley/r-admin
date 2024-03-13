import type { TopicOption, TopicWithOption } from '@/api/topic/interface';

export interface ExamTableModel {
  id: number;
  evaluationName: string;
  createTime: string;
  evaluationTypeText: string;
  describe: string;
  remark: string;
}

export interface UserAnswer {
  selected?: boolean;
  remark?: string;
}

export type UserAnswerOption = UserAnswer & TopicOption;

export type ExamTopicWithAnswer = TopicWithOption & {
  userAnswer?: UserAnswerOption[] | string | undefined;
};
