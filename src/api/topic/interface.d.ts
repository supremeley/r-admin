import { TopicTypeEnum } from '@/enums';

export interface Topic {
  name: string;
  type: TopicTypeEnum;
  status: boolean;
  sortNo: number;
  describe: string;
  remark: string;
  maxLength: number;
  required: boolean;
  inputted: boolean;
  inputtedTopic: string;
  inputtedRemark: string;
  id: number;
  evaluationId: number;
}

export interface TopicGroup {
  name: string;
  status: boolean;
  sortNo: number;
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
