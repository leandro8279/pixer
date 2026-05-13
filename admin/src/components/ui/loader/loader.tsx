import { twMerge } from 'tailwind-merge';
import styles from './loader.module.css';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import RenderComponent from '@/components/common/render-component';

interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
}

export function Loader(props: Props) {
  const { t } = useTranslation();
  const { className, showText = true, text = 'Loading...', simple } = props;

  return (
    <>
      <RenderComponent conditional={!!simple}>
        <div className={cn(className, styles.simple_loading)} />
      </RenderComponent>
      <RenderComponent conditional={!simple}>
        <div
          className={twMerge(
            cn('w-full flex flex-col items-center justify-center', className),
          )}
          style={{ height: 'calc(100vh - 200px)' }}
        >
          <div className={styles.loading} />
          <RenderComponent conditional={!!showText}>
            <h3 className="text-lg font-semibold text-body italic">
              {t(text)}
            </h3>
          </RenderComponent>
        </div>
      </RenderComponent>
    </>
  );
}

export default Loader;
