import React from 'react';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
}

export function Checkbox(props: Props) {
  const { className, label, name, error, ...rest } = props;
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="pb-checkbox"
          {...rest}
        />

        <label
          htmlFor={name}
          className="text-sm text-body"
        >
          {label}
        </label>
      </div>

      {error && <p className="my-2 text-xs text-red-500 text-end">{error}</p>}
    </div>
  );
}
