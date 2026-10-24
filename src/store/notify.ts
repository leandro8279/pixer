import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import i18n from '@/i18n';
import { RootService } from '@/services/root';
import { NotifyLogs, NotifyLogsPaginator, NotifyLogsQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

export class NotifyStore {
  _state = { notifyLogsParams: {} as Partial<NotifyLogsQueryOptions> };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      notifyLogs: computed,
      notifyLogsQuery: computed,
      notifyLogsPaginatorInfo: computed,
      notifyLogRead: computed,
      notifyLogAllRead: computed,

      setNotifyLogsParams: action,
    });
  }

  readonly #notifyLogs = new MobxQuery<NotifyLogsPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.notify.paginated(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  readonly #notifyLogRead = new MobxMutation<any, Error, any>({
    onSettled: () => this.#notifyLogs.refetch(),
    mutationFn: (variables) => this.service.notify.notifyLogSeen(variables),
    onError: (error) => toast.error(i18n.t(`${error.message}`)),
  });

  readonly #notifyLogAllRead = new MobxMutation<any, Error, Partial<NotifyLogsQueryOptions>>({
    onSettled: () => this.#notifyLogs.refetch(),
    mutationFn: (variables) => this.service.notify.readAllNotifyLogs(variables),
    onError: (error) => toast.error(i18n.t(`${error.message}`)),
  });

  get notifyLogsQuery() {
    return this.#notifyLogs.query({
      queryKey: [API_ENDPOINTS.NOTIFY_LOGS, this._state.notifyLogsParams],
      enabled: Boolean(this.root.auth.isAuthenticated),
    });
  }

  get notifyLogRead() {
    return this.#notifyLogRead;
  }

  get notifyLogs(): NotifyLogs[] {
    return this.notifyLogsQuery.data?.data ?? [];
  }

  get notifyLogsPaginatorInfo() {
    const data = this.notifyLogsQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  get activeStatus() {
    return this.notifyLogs.filter((item) => {
      return Boolean(item?.is_read) === false;
    });
  }

  get notifyLogAllRead() {
    return this.#notifyLogAllRead;
  }

  setNotifyLogsParams(params: Partial<NotifyLogsQueryOptions>) {
    this._state.notifyLogsParams = { ...this._state.notifyLogsParams, ...params };
  }

  dispose() {
    this.#notifyLogs.dispose();
    this.#notifyLogRead.dispose();
    this.#notifyLogAllRead.dispose();
  }
}
