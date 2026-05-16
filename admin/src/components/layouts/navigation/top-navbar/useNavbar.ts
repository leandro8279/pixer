import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root-context';

import { isBefore } from 'date-fns';
import { reaction } from 'mobx';
import { useSearchParams } from 'wouter';

export const useNavbar = () => {
  const [searchParams] = useSearchParams();
  const { app, setting, shop } = useRootStore();

  const slug = searchParams.get('shop') || undefined;

  useEffect(() => {
    const dispose = reaction(
      () => setting.settings,
      (settings) => {
        if (
          settings?.options?.maintenance?.start &&
          settings?.options?.maintenance?.until &&
          settings?.options?.isUnderMaintenance
        ) {
          const beforeDay = isBefore(new Date(), new Date(settings?.options?.maintenance?.start as string));
          // Calculate maintenance start time
          const maintenanceStartTime = new Date(settings?.options?.maintenance?.start as string);
          const maintenanceEndTime = new Date(settings?.options?.maintenance?.until as string);
          maintenanceStartTime.setMinutes(maintenanceStartTime.getMinutes());

          const currentTime = new Date();
          const checkIsMaintenanceStart =
            currentTime >= maintenanceStartTime &&
            currentTime < maintenanceEndTime &&
            settings?.options?.isUnderMaintenance;
          const checkIsMaintenance = beforeDay && settings?.options?.isUnderMaintenance;
          app.setIsMaintenanceMode(checkIsMaintenance as boolean);
          app.setUnderMaintenanceStart(checkIsMaintenanceStart as boolean);
        }
      },
    );

    return dispose;
  }, [app, setting]);

  useEffect(() => {
    if (slug) shop.setShopSlug(slug);

    const dispose = reaction(
      () => shop.shop,
      (shop) => {
        if (
          shop &&
          shop?.settings?.shopMaintenance?.start &&
          shop?.settings?.shopMaintenance?.until &&
          shop?.settings?.isShopUnderMaintenance
        ) {
          const beforeDay = isBefore(new Date(), new Date(shop?.settings?.shopMaintenance?.start as Date));
          // Calculate maintenance start time
          const maintenanceStartTime = new Date(shop?.settings?.shopMaintenance?.start as Date);
          const maintenanceEndTime = new Date(shop?.settings?.shopMaintenance?.until as Date);
          maintenanceStartTime.setMinutes(maintenanceStartTime.getMinutes());

          // Check if the current time has passed the maintenance start time
          const currentTime = new Date();
          const checkIsMaintenanceStart =
            currentTime >= maintenanceStartTime &&
            currentTime < maintenanceEndTime &&
            shop?.settings?.isShopUnderMaintenance;
          const checkIsMaintenance = beforeDay && shop?.settings?.isShopUnderMaintenance;
          app.setIsMaintenanceMode(checkIsMaintenance as boolean);
          app.setUnderMaintenanceStart(checkIsMaintenanceStart as boolean);
        }
      },
    );

    return dispose;
  }, [slug, shop, app]);

  function handleClick() {
    // openModal('SEARCH_VIEW');
    // setSearchModal(true);
  }

  function toggleSidebar() {}

  return { handleClick, toggleSidebar };
};
