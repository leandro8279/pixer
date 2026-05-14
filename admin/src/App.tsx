import { RootProvider } from '@/contexts/root-context';

import { Routes } from '@/config/routes';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';

import { Route, Router as WouterRouter, Switch } from 'wouter';

function Router() {
  return (
    <Switch>
      <Route path={Routes.login} component={LoginPage} />
      <Route path={Routes.register} component={RegisterPage} />
    </Switch>
  );
}

function App() {
  // const { t, i18n } = useTranslation('common')

  return (
    <RootProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </RootProvider>
  );
}

export default App;
