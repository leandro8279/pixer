import { Observer } from 'mobx-react-lite';
import React from 'react';

import { RenderComponent } from '@/components/common/render-component';
import { Button } from '@/components/ui/button';
import { ValidationError } from '@/components/ui/form-validation-error';

import { usePlaceOrderAction } from './usePlaceOrderAction';

interface Props {
  children?: React.ReactNode;
}

export function PlaceOrderAction({ children }: Props) {
  const { store, handlePlaceOrder } = usePlaceOrderAction();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <Button
            loading={false}
            className="mt-5 w-full"
            onClick={handlePlaceOrder}
            disabled={!store.isAllRequiredFieldSelected || false}
          >
            {children}
          </Button>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={store.errorMessage}>
            <div className="mt-3">
              <ValidationError message={store.errorMessage} />
            </div>
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
