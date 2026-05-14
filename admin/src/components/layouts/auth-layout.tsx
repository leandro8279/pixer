import Logo from '@/components/ui/logo';

export function AuthLayout({ children }: React.PropsWithChildren<object>) {
  return (
    <div
      className='flex h-screen items-center justify-center bg-light sm:bg-gray-100'
      // dir={dir}
    >
      <div className='m-auto w-full max-w-105 rounded bg-light p-5 sm:p-8 sm:shadow'>
        <div className='mb-2 flex justify-center'>
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
