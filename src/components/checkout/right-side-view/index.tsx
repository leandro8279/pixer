import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';

import { UnverifiedItemList } from '@/components/checkout/item/unverified-item-list';
import { VerifiedItemList } from '@/components/checkout/item/verified-item-list';
import { useRootStore } from '@/contexts/root';

export const RightSideView = observer(() => {
  const checkout = useRootStore('checkout');

  if (isEmpty(checkout.verifiedResponse)) {
    return <UnverifiedItemList />;
  }

  return <VerifiedItemList />;
});
