import cn from 'classnames';
import { PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

type ScrollbarProps = {
  options?: PartialOptions;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

export function Scrollbar({
  options,
  children,
  style,
  className,
  ...props
}: ScrollbarProps) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: 'scroll',
        },
        ...options,
      }}
      className={cn('os-theme-thin-dark', className)}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

export default Scrollbar;
