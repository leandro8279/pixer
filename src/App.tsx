/* eslint-disable react-refresh/only-export-components */
import 'react-toastify/dist/ReactToastify.css';

import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'wouter';

import { AppLayout } from '@/components/layouts/app-layout';
import { ErrorMessage } from '@/components/ui/error-message';
import { PageLoader } from '@/components/ui/page-loader';
import { queryClient } from '@/config/query-client';
import { Routes } from '@/config/routes';
import { RootProvider, useRootStore } from '@/contexts/root';
import { SettingsProvider } from '@/contexts/settings';
import { ForgotPassword } from '@/pages/auth/forgot-password';
import { LoginPage } from '@/pages/auth/login';
import { CategoriesPage } from '@/pages/categories/list';
import { DashboardPage } from '@/pages/dashboard';
import { GroupsPage } from '@/pages/groups/list';
import { DraftsPage } from '@/pages/products/drafts';
import { InventoryPage } from '@/pages/products/inventory';
import { ProductsPage } from '@/pages/products/list';
import { ProductStockPage } from '@/pages/products/product-stock';
import { CreateShop } from '@/pages/shops/create';
import { ShopsPage } from '@/pages/shops/list';
import { TagsPage } from '@/pages/tags/list';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const AppSettings = observer((props: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = React.useState(true);
  const { settings, settingsQuery } = useRootStore('setting');

  useEffect(() => {
    if (settings) {
      setInitialized(false);
    }
  }, []);

  if (!initialized || settingsQuery.isLoading) {
    return <PageLoader />;
  }

  if (settingsQuery.isError) {
    return <ErrorMessage message={settingsQuery.error.message} />;
  }

  return (
    <SettingsProvider
      initialValue={settings?.options}
      {...props}
    ></SettingsProvider>
  );
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootProvider>
        <AppSettings>
          <AppLayout>
            <Switch>
              <Route
                path={Routes.shop.list}
                component={ShopsPage}
              />
              <Route
                path={Routes.dashboard}
                component={DashboardPage}
              />
              <Route
                path={Routes.login}
                component={LoginPage}
              />
              <Route
                path={Routes.forgotPassword}
                component={ForgotPassword}
              />
              <Route
                component={CreateShop}
                path={Routes.shop.create}
              />
              <Route
                component={ProductsPage}
                path={Routes.product.list}
              />
              <Route
                component={DraftsPage}
                path={Routes.draftProducts}
              />
              <Route
                component={ProductStockPage}
                path={Routes.outOfStockOrLowProducts}
              />
              <Route
                component={GroupsPage}
                path={Routes.type.list}
              />
              <Route
                component={InventoryPage}
                path={Routes.productInventory}
              />
              <Route
                component={CategoriesPage}
                path={Routes.category.list}
              />
              <Route
                component={TagsPage}
                path={Routes.tag.list}
              />
              {/* <Route path="/users/:name">{(params) => <>Hello, {params.name}!</>}</Route> */}

              {/* Default route in a switch */}
              <Route>404: No such page!</Route>
            </Switch>
            <ToastContainer
              autoClose={2000}
              theme="colored"
            />
          </AppLayout>
        </AppSettings>
      </RootProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
