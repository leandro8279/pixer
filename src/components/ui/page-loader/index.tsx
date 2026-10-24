import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './page-loader.module.css';

export function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className={cn('w-full h-screen flex flex-col items-center justify-center')}>
      <div className="flex relative">
        <div className={styles.page_loader}></div>
        <h3 className="text-sm font-semibold text-body italic absolute top-1/2 -mt-2 w-full text-center">{t('text-loading')}</h3>
      </div>
    </div>
  );
}
