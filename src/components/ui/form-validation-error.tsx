import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  message: string | undefined;
}

export function ValidationError(props: Props) {
  const { message, className } = props;
  return <p className={twMerge(classNames('my-2 text-xs text-start text-red-500', className))}>{message}</p>;
}
