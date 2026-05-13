import cn from 'classnames';
import { TriangleArrowDown } from '@/components/icons/triangle-arrow-down';
import { TriangleArrowUp } from '@/components/icons/triangle-arrow-up';
import RenderComponent from '@/components/common/render-component';

type Props = {
  title: string | React.ReactNode;
  ascending: boolean;
  isActive: boolean;
  className?: string;
};

export function TitleWithSort({
  title,
  ascending,
  isActive = true,
  className,
}: Props) {
  const arrowClassName = cn('flex-shrink-0 text-gray-300 ms-1.5', {
    '!text-heading': isActive,
  });

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span title={`Sort by ${title}`}>{title}</span>
      <RenderComponent conditional={ascending}>
        <TriangleArrowUp width="9" className={arrowClassName} />
      </RenderComponent>
      <RenderComponent conditional={!ascending}>
        <TriangleArrowDown width="9" className={arrowClassName} />
      </RenderComponent>
    </span>
  );
}

export default TitleWithSort;
