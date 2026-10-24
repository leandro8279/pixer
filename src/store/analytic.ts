import { computed, makeObservable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';

import { MobxQuery } from './query';

export class AnalyticStore {
  constructor(private readonly service: RootService) {
    makeObservable(this, { analytics: computed, analyticsQuery: computed });
  }

  readonly #analytics = new MobxQuery<any, Error>({
    queryFn: () => this.service.analytic.analytics(),
  });

  get analyticsQuery() {
    return this.#analytics.query({ queryKey: [API_ENDPOINTS.ANALYTICS] });
  }

  get analytics() {
    return this.analyticsQuery.data || null;
  }

  dispose() {
    this.#analytics.dispose();
  }
}
