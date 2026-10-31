import { useTranslation } from 'react-i18next';

export function CashPayment() {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-sm text-body block">{t('text-cash-message')}</span>
    </>
  );
}
