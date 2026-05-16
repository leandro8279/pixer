import { cn } from '@/utils/util';

export function AdminLayout() {
  return (
    <div className='flex min-h-screen flex-col bg-gray-100 transition-colors duration-150' dir='ltr'>
      <Navbar />
      <MobileNavigation>
        <SideBarGroup />
      </MobileNavigation>

      <div className='flex flex-1'>
        <aside
          className={cn(
            'fixed bottom-0 z-10 hidden h-full w-72 bg-white shadow transition-[width] duration-300 ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block',
            width >= RESPONSIVE_WIDTH && (underMaintenance || underMaintenanceStart) ? 'lg:pt-[8.75rem]' : 'pt-20',
            miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:w-24' : 'lg:w-76',
          )}
        >
          <div className='sidebar-scrollbar h-full w-full overflow-x-hidden'>
            <Scrollbar className='h-full w-full' options={{ scrollbars: { autoHide: 'never' } }}>
              <SideBarGroup />
            </Scrollbar>
          </div>
        </aside>
        <main
          className={cn(
            'relative flex w-full flex-col justify-start transition-[padding] duration-300',
            width >= RESPONSIVE_WIDTH && (underMaintenance || underMaintenanceStart)
              ? 'lg:pt-[8.75rem]'
              : 'pt-[72px] lg:pt-20',
            miniSidebar && width >= RESPONSIVE_WIDTH
              ? 'ltr:lg:pl-24 rtl:lg:pr-24'
              : 'ltr:xl:pl-76 rtl:xl:pr-76 ltr:lg:pl-72 rtl:lg:pr-72 rtl:lg:pl-0',
          )}
        >
          <div className='h-full p-5 md:p-8'>{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
