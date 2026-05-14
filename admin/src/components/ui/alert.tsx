import RenderComponent from '@/components/common/render-component';
import { CloseIcon } from '@/components/icons/close-icon';

import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

type AlertProps = {
  message: string | undefined | null;
  variant?:
    | 'info'
    | 'warning'
    | 'error'
    | 'success'
    | 'infoOutline'
    | 'warningOutline'
    | 'errorOutline'
    | 'successOutline';
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  childClassName?: string;
};

const variantClasses = {
  info: 'bg-blue-100 text-blue-600',
  warning: 'bg-yellow-100 text-yellow-600',
  error: 'bg-red-100 text-red-500',
  success: 'bg-green-100 text-accent',
  infoOutline: 'border border-blue-200 text-blue-600',
  warningOutline: 'border border-yellow-200 text-yellow-600',
  errorOutline: 'border border-red-200 text-red-600',
  successOutline: 'border border-green-200 text-green-600',
};

export function Alert({
  message = '',
  closeable = false,
  variant = 'info',
  className,
  onClose,
  children,
  childClassName,
}: AlertProps) {
  return (
    <div
      className={twMerge(
        cn(
          'relative flex items-center justify-between rounded py-4 px-5 shadow-sm',
          variantClasses[variant],
          className,
        ),
      )}
      role='alert'
    >
      <div className={twMerge(cn(childClassName))}>
        <p className='text-sm'>{message}</p>
        {children}
      </div>
      <RenderComponent conditional={!!closeable}>
        <button
          data-dismiss='alert'
          aria-label='Close'
          onClick={onClose}
          title='Close alert'
          className='absolute top-1/2 -mt-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-red-500 transition-colors duration-200 -me-0.5 end-2 hover:bg-gray-300 hover:bg-opacity-25 focus:bg-gray-300 focus:bg-opacity-25 focus:outline-none'
        >
          <span aria-hidden='true'>
            <CloseIcon className='h-3 w-3' />
          </span>
        </button>
      </RenderComponent>
    </div>
  );
}

export default Alert;
