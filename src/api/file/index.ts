import type { AxiosProgressEvent } from 'axios';

import { ResponseType } from '@/enums';
import { useAxios } from '@/hooks';

enum Api {
  FileUpload = '/file/upload',
  FileDownload = '/file/download',
}

export const fileUpload = (params: UploadFileParams, onProgress: (progressEvent: AxiosProgressEvent) => void) => {
  return useAxios.uploadFile<SuccessResponse<UploadFileResult>>({ url: Api.FileUpload }, params, onProgress);
};

export const fileDownload = (params: { id: number }) => {
  return useAxios.get<Blob>({ url: Api.FileDownload, params, responseType: ResponseType.Blob });
};
