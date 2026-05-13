export function Link({
  className,
  children,
  ...props
}: NextLinkProps & {
  className?: string;
  title?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children?: React.ReactNode;
}) {
  return (
    <a {...props} className={className}>
      {children}
    </a>
  );
}

export default Link;
