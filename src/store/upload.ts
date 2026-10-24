import { computed, makeObservable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { queryClient } from '@/config/query-client';
import { RootService } from '@/services/root';
import { Attachment } from '@/types';

import { MobxMutation } from './mutation';

export class UploadStore {
  constructor(private readonly service: RootService) {
    makeObservable(this, { upload: computed });
  }

  #upload = new MobxMutation<Attachment, Error, any>({
    mutationFn: (variables) => this.service.upload.upload(variables),
    onSettled: () => queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.SETTINGS] }),
  });

  get upload() {
    return this.#upload;
  }

  dispose() {
    this.#upload.dispose();
  }
}
