import { API_ENDPOINTS, AUTH_CRED, PERMISSIONS, TOKEN } from '@/utils/constants';

import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { MobxMutation } from './MobxMutation';
import { MobxQuery } from './MobxQuery';

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User, UserPermission } from '@/types';
import type { RootService } from '@/services/root.service';
interface AuthCredential {
  [TOKEN]: string;
  [PERMISSIONS]: string[];
  role: string;
}

export class AuthStore {
  token: string | null = null;
  permissions: string[] = [];
  role: string | null = null;
  emailVerified = false;

  readonly #loginMutation: MobxMutation<LoginResponse, Error, LoginRequest>;
  readonly #registerMutation: MobxMutation<RegisterResponse, Error, RegisterRequest>;
  readonly #me = new MobxQuery<User, Error>({
    enabled: false,
    queryKey: [API_ENDPOINTS.ME],
    queryFn: () => this.service.auth.me(),
  });

  constructor(private readonly service: RootService) {
    makeObservable(this, {
      role: observable,
      token: observable,
      permissions: observable,
      hasPermission: computed,
      emailVerified: observable,
      isAuthenticated: computed,
      login: computed,
      register: computed,
      me: computed,
      meQuery: computed,
      logout: action,
    });
    this.rehydrate();

    this.#loginMutation = new MobxMutation<LoginResponse, Error, LoginRequest>({
      mutationFn: (data) => this.service.auth.login(data),
      onSuccess: (data) => this.setSession(data),
    });

    this.#registerMutation = new MobxMutation<RegisterResponse, Error, RegisterRequest>({
      mutationFn: (data) => this.service.auth.register(data),
      onSuccess: (data) => this.setSession(data),
    });
  }

  get meQuery() {
    return this.#me.query({
      queryKey: [API_ENDPOINTS.ME],
      enabled: this.isAuthenticated,
      queryFn: () => this.service.auth.me(),
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
    return this.token !== null;
  }

  private setSession(data: LoginResponse | RegisterResponse) {
    runInAction(() => {
      this.#me.refetch();
      const token = data.token ?? null;
      const permissions = data.permissions ?? [];
      const role = 'role' in data ? (data.role ?? null) : null;
      const emailVerified = 'email_verified' in data ? data.email_verified : true;

      this.token = token;
      this.permissions = permissions;
      this.role = role;
      this.emailVerified = emailVerified;

      if (token) {
        const cred: AuthCredential = { [TOKEN]: token, [PERMISSIONS]: permissions, role: role ?? '' };
        localStorage.setItem(AUTH_CRED, JSON.stringify(cred));
      } else {
        localStorage.removeItem(AUTH_CRED);
      }
    });
  }

  logout() {
    this.token = null;
    this.permissions = [];
    this.role = null;
    this.emailVerified = false;
    localStorage.removeItem(AUTH_CRED);
  }

  private rehydrate() {
    try {
      const raw = localStorage.getItem(AUTH_CRED);
      if (!raw) return;
      const cred = JSON.parse(raw) as AuthCredential;
      this.token = cred[TOKEN] ?? null;
      this.permissions = cred[PERMISSIONS] ?? [];
      this.role = cred.role ?? null;
      this.emailVerified = true;
    } catch {
      localStorage.removeItem(AUTH_CRED);
    }
  }

  hasPermission(permission: UserPermission): boolean {
    return this.permissions.includes(permission);
  }

  dispose() {
    this.#me.dispose();
    this.#loginMutation.dispose();
    this.#registerMutation.dispose();
  }
}
