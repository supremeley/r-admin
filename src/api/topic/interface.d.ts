export type Topic = {
  name: string;
  type: number;
  status: boolean;
  sortNo: number;
  describe: string;
  remark: string;
  id: number;
} & OperateTopicOption;

export interface TopicOption {
  name: string;
  score?: number;
  id?: number;
  // type: number;
  // status: boolean;
  // sortNo: number;
  // describe: string;
  // remark: string;
}

export interface OperateTopicOption {
  id?: number;
  evaluationId: number;
  topicOptionList: TopicOption[];
}
