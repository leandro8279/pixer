import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder } from '@/types';

export const useRecentOrderBar = () => {
  const auth = useRootStore('auth');
  const notify = useRootStore('notify');
  const store = useLocalObservable(() => ({
    orderOpen: false,
    setOrderOpen(value: boolean) {
      this.orderOpen = value;
    },
  }));

  const markAllAsRead = () => {
    notify.notifyLogRead.mutate({ set_all_read: true, notify_type: 'order', receiver: auth.me?.id });
  };

  useEffect(() => {
    notify.setNotifyLogsParams({ limit: 5, orderBy: 'created_at', notify_type: 'order', sortedBy: SortOrder.Desc as SortOrder });
  }, []);

  useEffect(() => {
    // if (Config.broadcastDriver === 'pusher' && Config.pusherEnable === 'true') {
    //   const channelName = `${import.meta.env.PUBLIC_ORDER_CREATED_CHANNEL_PRIVATE}` + '.' + user?.id;
    //   const channel = PusherConfig.subscribe(channelName);
    //   channel.bind(`${process.env.NEXT_PUBLIC_ORDER_CREATED_EVENT}`, function (data: any) {
    //     allOrder.push(data);
    //     setOrder(allOrder);
    //     toast.success(data?.message, { toastId: 'orderSuccess' });
    //   });
    //   return () => {
    //     PusherConfig.unsubscribe(channelName);
    //   };
    // } else {
    //   PusherConfig.disconnect();
    // }
  }, []);

  return { store, markAllAsRead };
};
