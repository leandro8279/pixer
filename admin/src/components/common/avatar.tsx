import React from 'react';

import { cn } from '@/utils/util';

const classes = {
  base: 'inline-flex items-center justify-center flex-shrink-0 border text-accent border-border-100 bg-accent/10 overflow-hidden relative',
  size: { sm: '32px', DEFAULT: '40px', lg: '48px', xl: '56px' },
  fontSize: { sm: 'text-xs', DEFAULT: 'text-sm', lg: 'text-base', xl: 'text-lg' },
  rounded: { none: 'rounded-none', sm: 'rounded', md: 'rounded-xl', lg: 'rounded-2xl', full: 'rounded-full' },
};

interface AvatarProps {
  src?: string;
  name: string;
  initials?: string;
  size?: keyof typeof classes.size;
  customSize?: string;
  rounded?: keyof typeof classes.rounded;
  onClick?: () => void;
  className?: string;
}

function getInitials(name: string) {
  if (!name) return 'GU';
  const words = name.split(' ');
  const initials = words.map((word) => word[0]);
  return initials.slice(0, 2).join('').toUpperCase();
}

export function Avatar(props: AvatarProps) {
  const { src, name, size = 'DEFAULT', initials, customSize, rounded = 'full', onClick, className, ...rest } = props;

  const [isError, setError] = React.useState(false);

  if (src && !isError) {
    return (
      <div
        className={cn(classes.base, classes.rounded[rounded], onClick && 'cursor-pointer', className)}
        style={{ width: customSize ?? classes.size[size], height: customSize ?? classes.size[size] }}
        onClick={onClick}
        {...rest}
      >
        <img
          alt={name}
          src={src}
          loading='eager'
          sizes='(max-width: 768px) 100vw'
          onError={() => setError(() => true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <span
      title={name}
      className={cn(
        classes.base,
        classes.fontSize[size],
        classes.rounded[rounded],
        'font-semibold',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{ width: customSize ?? classes.size[size], height: customSize ?? classes.size[size] }}
      onClick={onClick}
    >
      {initials || getInitials(name)}
    </span>
  );
}
