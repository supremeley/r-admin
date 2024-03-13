import { useAxios } from '@/hooks';

import type { DetailParams, ExamDetailResult, ExamListResult } from './interface';

enum Api {
  ExamDetail = '/exam/detail',
  ExamRecordByUser = '/exam/record',
  DownlaodExamReport = '/exam/report',
}

export const getExamDetail = (params: DetailParams) => {
  return useAxios.get<SuccessResponse<ExamDetailResult>>({ url: Api.ExamDetail, params });
};

export const getExamRecordByUser = (params: ListParams) => {
  return useAxios.get<SuccessResponse<ExamListResult>>({ url: Api.ExamRecordByUser, params });
};

export const downlaodExamReport = (params: ListParams) => {
  return useAxios.post<SuccessResponse<ExamListResult>>({ url: Api.DownlaodExamReport, params });
};
