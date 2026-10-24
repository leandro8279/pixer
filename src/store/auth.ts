import Cookies from 'js-cookie';
import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { Routes } from '@/config/routes';
import { AUTH_TOKEN_KEY } from '@/services/base';
import { RootService } from '@/services/root';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@/types';
import { allowedRoles, hasAccess, setAuthCredentials } from '@/utils/auth-utils';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';

export class AuthStore {
  _errorMessage = '';

  readonly #loginMutation: MobxMutation<LoginResponse, Error, LoginRequest>;
  readonly #registerMutation: MobxMutation<RegisterResponse, Error, RegisterRequest>;
  readonly #me = new MobxQuery<User, Error>({ queryFn: () => this.service.auth.me() });

  constructor(private readonly service: RootService) {
    makeObservable(this, {
      _errorMessage: observable,
      isAuthenticated: computed,
      login: computed,
      register: computed,
      me: computed,
      meQuery: computed,
      setErrorMessage: action,
    });

    this.#loginMutation = new MobxMutation<LoginResponse, Error, LoginRequest>({
      onSuccess: (data) => {
        if (data?.token) {
          if (hasAccess(allowedRoles, data?.permissions)) {
            setAuthCredentials(data?.token, data?.permissions, data?.role);

            this.#me.refetch();
            return window.location.replace(Routes.dashboard);
          }
          this.setErrorMessage('error-enough-permission');
        } else {
          this.setErrorMessage('error-credential-wrong');
        }
      },
      mutationFn: (data) => this.service.auth.login(data),
    });

    this.#registerMutation = new MobxMutation<RegisterResponse, Error, RegisterRequest>({
      mutationFn: (data) => this.service.auth.register(data),
      // onSuccess: (data) => this.setSession(data),
    });
  }

  get meQuery() {
    return this.#me.query({
      queryKey: [API_ENDPOINTS.ME],
      enabled: this.isAuthenticated,
    });
  }

  get me() {
    return this.meQuery.data || ({} as User);
  }

  get login() {
    return this.#loginMutation;
  }

  get register() {
    return this.#registerMutation;
  }

  get isAuthenticated(): boolean {
    return Cookies.get(AUTH_TOKEN_KEY) != null;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  setErrorMessage(value: string) {
    this._errorMessage = value;
  }

  dispose() {
    this.#me.dispose();
    this.#loginMutation.dispose();
    this.#registerMutation.dispose();
  }
}
