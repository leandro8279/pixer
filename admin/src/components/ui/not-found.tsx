import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import RenderComponent from '@/components/common/render-component';

interface Props {
  text?: string;
  image?: string;
  className?: string;
  imageParentClassName?: string;
}

export function NotFound({
  className,
  imageParentClassName,
  text,
  image = '/no-result.svg',
}: Props) {
  const { t } = useTranslation('common');

  return (
    <div className={twMerge(cn('flex flex-col items-center', className))}>
      <div
        className={twMerge(
          cn(
            'relative flex h-full min-h-[380px] w-full items-center justify-center md:min-h-[450px]',
            imageParentClassName
          )
        )}
      >
        <img
          src={image}
          alt={text ? t(text) : t('text-no-result-found')}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <RenderComponent conditional={!!text}>
        <h3 className="my-7 w-full text-center text-base font-semibold text-heading/80 lg:text-xl">
          {text && t(text)}
        </h3>
      </RenderComponent>
    </div>
  );
}

export default NotFound;
