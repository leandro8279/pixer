import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/config/query-client';
import { RootProvider } from '@/contexts/root-context';

import { Routes } from '@/config/routes';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';

import { Route, Router as WouterRouter, Switch, Redirect } from 'wouter';

function Router() {
  return (
    <Switch>
      <Route path={Routes.dashboard}>
        <Redirect to={Routes.login} />
      </Route>
      <Route path={Routes.login} component={LoginPage} />
      <Route path={Routes.register} component={RegisterPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
      </RootProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
