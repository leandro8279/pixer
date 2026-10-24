import { observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect } from 'wouter';

import { ErrorMessage } from '@/components/ui/error-message';
import { PageLoader } from '@/components/ui/page-loader';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from '@/utils/auth-utils';

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = observer(function RequireAuth({ children }: Props) {
  const auth = useRootStore('auth');
  const credentials = getAuthCredentials();

  if (!isAuthenticated(credentials) || !auth.isAuthenticated) {
    return <Redirect to={Routes.login} />;
  }

  if (!hasAccess(allowedRoles, credentials.permissions)) {
    return <ErrorMessage message="text-access-denied-message" />;
  }

  const session = auth.meQuery;

  if (session.isLoading || session.isFetching) {
    return <PageLoader />;
  }

  if (session.isError) {
    return <ErrorMessage message={session.error.message} />;
  }

  if (!session.data?.id) {
    return <ErrorMessage message="PIXER_ERROR.NOT_AUTHORIZED" />;
  }

  return <>{children}</>;
});
