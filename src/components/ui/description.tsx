import React from 'react';

interface Props {
  title?: string;
  className?: string;
  [key: string]: unknown;
  details?: string | React.JSX.Element;
}

export function Description(props: Props) {
  const { title, details, className, ...rest } = props;
  return (
    <div
      className={className}
      {...rest}
    >
      {title && <h4 className="text-base font-semibold text-body-dark mb-2">{title}</h4>}
      {details && <p className="text-sm text-body">{details}</p>}
    </div>
  );
}
