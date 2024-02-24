import type { AxiosProgressEvent } from 'axios';

import { useAxios } from '@/hooks';

enum Api {
  FileUpload = '/file/upload',
}

export const fileUpload = (params: UploadFileParams, onProgress: (progressEvent: AxiosProgressEvent) => void) => {
  return useAxios.uploadFile<SuccessResponse<UploadFileResult>>({ url: Api.FileUpload }, params, onProgress);
};
