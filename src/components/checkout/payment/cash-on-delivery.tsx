import { useTranslation } from 'react-i18next';

export function CashOnDelivery() {
  const { t } = useTranslation();

  return (
    <>
      <span className="text-sm text-body block">{t('text-cod-message')}</span>
    </>
  );
}
