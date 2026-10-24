import Cookie from 'js-cookie';

import { AUTH_CRED, PERMISSIONS, STAFF, STORE_OWNER, SUPER_ADMIN, TOKEN } from './constants';

export const adminOnly = [SUPER_ADMIN];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF];

export function hasAccess(_allowedRoles: string[], _userPermissions: string[] | undefined | null) {
  if (_userPermissions) {
    return Boolean(_allowedRoles?.find((aRole) => _userPermissions.includes(aRole)));
  }
  return false;
}

export function setAuthCredentials(token: string, permissions: any, role: any) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, role }));
}

export function getAuthCredentials(): { token: string | null; permissions: string[] | null; role: string | null } {
  const authCred = Cookie.get(AUTH_CRED);

  if (authCred) {
    return JSON.parse(authCred);
  }

  return { token: null, permissions: null, role: null };
}

export function isAuthenticated(_cookies: any) {
  return !!_cookies[TOKEN] && Array.isArray(_cookies[PERMISSIONS]) && !!_cookies[PERMISSIONS].length;
}
