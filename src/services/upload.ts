import { API_ENDPOINTS } from '@/config/endpoints';
import { Attachment } from '@/types';

import { BaseService } from './base';

export class UploadService extends BaseService {
  upload = async (variables: any) => {
    let formData = new FormData();

    variables.forEach((attachment: any) => {
      formData.append('attachment[]', attachment);
    });

    const options = { headers: { 'Content-Type': 'multipart/form-data' } };
    return this.post<Attachment>(API_ENDPOINTS.ATTACHMENTS, formData, options);
  };
}
