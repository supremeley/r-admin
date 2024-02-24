import { useAxios } from '@/hooks';

import type { Premission } from './interface';

enum Api {
  Premission = '/auth/login',
}

export const getPremission = () => {
  return useAxios.post<SuccessResponse<Premission>>({ url: Api.Premission });
};
