import { Link as NavLink } from 'wouter';

import type { LinkProps } from 'wouter';

interface Props extends LinkProps {
  className?: string;
  title?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children?: React.ReactNode;
}
export function Link({ className, children, ...props }: Props) {
  return (
    <NavLink {...props} className={className}>
      {children}
    </NavLink>
  );
}

export default Link;
