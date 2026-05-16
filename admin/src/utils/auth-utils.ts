import { AUTH_CRED, STAFF, STORE_OWNER, SUPER_ADMIN } from './constants';

export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN];
export const ownerOnly = [STORE_OWNER];
export const ownerAndStaffOnly = [STORE_OWNER, STAFF];

export function getAuthCredentials(): {
  token: string | null;
  permissions: string[] | null;
  role: string | null;
} {
  const authCred = window.localStorage.getItem(AUTH_CRED);

  if (authCred) {
    return JSON.parse(authCred);
  }

  return { token: null, permissions: null, role: null };
}
