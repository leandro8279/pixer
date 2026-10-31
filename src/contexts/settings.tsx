/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';

export interface State {
  settings: any;
  siteTitle: string;
  siteSubtitle: string;
}

const initialState = {
  siteTitle: 'Pixer',
  siteSubtitle: '',
  copyrightText: '',
  externalText: '',
  externalLink: '',
  currency: 'USD',
  deliveryTime: [],
  currencyOptions: { formation: 'en-US', fractions: 2 },
  logo: { id: 1, thumbnail: '/logo.svg', original: '/logo.svg' },
};

export const SettingsContext = React.createContext(initialState);

SettingsContext.displayName = 'SettingsContext';

export function SettingsProvider({ initialValue, ...props }: { initialValue: any }) {
  const [state, updateSettings] = React.useState(initialValue ?? initialState);
  const value = useMemo(() => ({ ...state, updateSettings }), [state]);

  return (
    <SettingsContext.Provider
      value={value}
      {...props}
    />
  );
}

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
