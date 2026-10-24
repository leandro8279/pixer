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
  const credentials = JSON.stringify({ token, permissions, role });
  const tokenKey = import.meta.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? AUTH_CRED;

  Cookie.set(AUTH_CRED, credentials);
  if (tokenKey !== AUTH_CRED) {
    Cookie.set(tokenKey, credentials);
  }
}

export function getAuthCredentials(): { token: string | null; permissions: string[] | null; role: string | null } {
  const authCred = Cookie.get(AUTH_CRED);

  if (authCred) {
    try {
      const credentials = JSON.parse(authCred);

      return {
        token: typeof credentials.token === 'string' ? credentials.token : null,
        permissions: Array.isArray(credentials.permissions) ? credentials.permissions : null,
        role: typeof credentials.role === 'string' ? credentials.role : null,
      };
    } catch {
      Cookie.remove(AUTH_CRED);
    }
  }

  return { token: null, permissions: null, role: null };
}

export function isAuthenticated(_cookies: any) {
  return !!_cookies[TOKEN] && Array.isArray(_cookies[PERMISSIONS]) && !!_cookies[PERMISSIONS].length;
}
