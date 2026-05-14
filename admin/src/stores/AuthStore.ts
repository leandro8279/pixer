import { makeAutoObservable } from 'mobx';

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UserPermission } from '@/types';
import { AUTH_CRED, TOKEN, PERMISSIONS } from '@/utils/constants';
import { MobxMutation } from './MobxMutation';
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

  readonly loginMutation: MobxMutation<LoginResponse, Error, LoginRequest>;
  readonly registerMutation: MobxMutation<RegisterResponse, Error, RegisterRequest>;

  constructor(private readonly service: RootService) {
    makeAutoObservable(this);
    this.rehydrate();

    this.loginMutation = new MobxMutation<LoginResponse, Error, LoginRequest>({
      mutationFn: (data) => this.service.auth.login(data),
      onSuccess: (data) => this.setSession(data),
    });

    this.registerMutation = new MobxMutation<RegisterResponse, Error, RegisterRequest>({
      mutationFn: (data) => this.service.auth.register(data),
      onSuccess: (data) => this.setSession(data),
    });
  }

  get isAuthenticated(): boolean {
    return this.token !== null;
  }

  private setSession(data: LoginResponse | RegisterResponse) {
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
    this.loginMutation.dispose();
    this.registerMutation.dispose();
  }
}
