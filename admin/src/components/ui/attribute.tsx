import cn from 'classnames';
import RenderComponent from '@/components/common/render-component';

type AttributeProps = {
  value?: string;
  active?: boolean;
  className?: string;
  color?: string;
  [key: string]: unknown;
};

export function Attribute({
  value,
  active,
  className,
  color,
  ...props
}: AttributeProps) {
  const classes = cn(
    {
      'px-4 py-3 text-sm border rounded text-heading bg-gray-50 border-border-200':
        className !== 'color',
      '!text-light !bg-accent !border-accent': active && className !== 'color',
      'h-11 w-11 p-0.5 flex items-center justify-center border-2 rounded-full border-transparent':
        className === 'color',
      '!border-accent': active && className === 'color',
    },
    'cursor-pointer'
  );

  return (
    <div className={classes} {...props}>
      <RenderComponent conditional={className === 'color'}>
        <span
          className="w-full h-full rounded-full border border-border-200"
          style={{ backgroundColor: color }}
        />
      </RenderComponent>
      <RenderComponent conditional={className !== 'color'}>
        <>{value}</>
      </RenderComponent>
    </div>
  );
}

export default Attribute;
