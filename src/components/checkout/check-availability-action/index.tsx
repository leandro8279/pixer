import React from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { Button } from '@/components/ui/button';
import { ValidationError } from '@/components/ui/form-validation-error';

interface Props {
  children?: React.ReactNode;
}

export function CheckAvailabilityAction({ children }: Props) {
  const { t } = useTranslation();

  function handleVerifyCheckout() {
    alert('handleVerifyCheckout');
  }

  return (
    <React.Fragment>
      <Button
        loading={false}
        className="mt-5 w-full"
        onClick={handleVerifyCheckout}
        // disabled={isEmpty || loading}
      >
        {children}
      </Button>
      <RenderComponent conditional={'errorMessage'}>
        <div className="mt-3">
          <ValidationError message={t('errorMessage')} />
        </div>
      </RenderComponent>
    </React.Fragment>
  );
}
