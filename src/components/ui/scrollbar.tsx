import "overlayscrollbars/overlayscrollbars.css";

import cn from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import type { PartialOptions } from "overlayscrollbars";
interface Props {
  options?: PartialOptions;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export function Scrollbar(props: Props) {
  const { options, children, style, className, ...rest } = props;

  return (
    <OverlayScrollbarsComponent
      options={{ scrollbars: { autoHide: "scroll" }, ...options }}
      className={cn("os-theme-thin-dark", className)}
      style={style}
      {...rest}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
