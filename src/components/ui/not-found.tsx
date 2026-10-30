import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { RenderComponent } from '@/components/common/render-component';

interface Props {
  text?: string;
  image?: string;
  className?: string;
  imageParentClassName?: string;
}

export function NotFound(props: Props) {
  const { t } = useTranslation();
  const { className, imageParentClassName, text, image = '/no-result.svg' } = props;
  return (
    <div className={twMerge(classNames('flex flex-col items-center', className))}>
      <div className={twMerge(classNames('relative flex h-full min-h-95 w-full items-center justify-center md:min-h-112.5', imageParentClassName))}>
        <img
          src={image}
          alt={text ? t(text) : t('text-no-result-found')}
          className="h-full w-full object-contain"
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      <RenderComponent conditional={text}>
        <h3 className="my-7 w-full text-center text-base font-semibold text-heading/80 lg:text-xl">{t(text || '')}</h3>
      </RenderComponent>
    </div>
  );
}
