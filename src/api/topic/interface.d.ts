import { TopicTypeEnum } from '@/enums';

export interface Topic {
  name: string;
  type: TopicTypeEnum;
  status: boolean;
  sortNo: number;
  describe: string;
  remark: string;
  required: boolean;
  maxLength: number;
  rangeMin: number;
  rangeMax: number;
  inputted: boolean;
  inputtedTopic: string;
  inputtedRemark: string;
  inputtedCondition: string;
  id: number;
  evaluationId: number;
}

export interface TopicGroup {
  name: string;
  status: boolean;
  sortNo: number;
  disorder: boolean;
  describe: string;
  remark: string;
  id: number;
  evaluationId: number;
}

export type TopicGroupWithTopic = TopicGroup & {
  topicList: Topic[];
};

export interface TopicOption {
  name: string;
  score?: number;
  id?: number;
  inputted?: boolean;
  // TODO:
  // type: number;
  // status: boolean;
  // sortNo: number;
  // describe: string;
  // remark: string;
}

export type TopicWithOption = Topic & {
  topicGroupList?: TopicGroup[];
  topicOptionList?: TopicOption[];
};

export type OperateTopic<T = unknown> = {
  evaluationId: number;
} & Partial<Topic> &
  Required<T>;

export type OperateTopicWithOption<T = unknown> = {
  topicOptionList?: TopicOption[];
} & OperateTopic<T>;

export type OperateGroup = {
  evaluationId: number;
} & Partial<TopicGroup>;

export interface RelatedTopic {
  groupId: number;
  topicList: number[];
}
