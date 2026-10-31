import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { useRootStore } from '@/contexts/root';
import { useSettings } from '@/contexts/settings';
import { Label, Radio, RadioGroup } from '@headlessui/react';

import { ScheduleCard } from './schedule-card';

interface Props {
  label: string;
  className?: string;
  count?: number;
}

export function ScheduleGrid(props: Props) {
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');
  const { label, className, count } = props;
  const { deliveryTime: schedules } = useSettings();

  useEffect(() => {
    if (schedules && schedules.length > 0) {
      checkout.setDeliveryTime(schedules[0]);
    }
  }, [schedules]);

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="space-s-3 md:space-s-4 flex items-center">
          {count && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">{count}</span>}
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>
      </div>

      <RenderComponent conditional={schedules && schedules?.length}>
        <Observer>
          {() => (
            <RadioGroup
              value={checkout.deliveryTime}
              onChange={checkout.setDeliveryTime}
            >
              <Label className="sr-only">{label}</Label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {schedules?.map((schedule: any, idx: number) => (
                  <Radio
                    key={idx}
                    value={schedule}
                  >
                    {({ checked }) => (
                      <ScheduleCard
                        checked={checked}
                        schedule={schedule}
                      />
                    )}
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          )}
        </Observer>
      </RenderComponent>

      <RenderComponent conditional={!Boolean(schedules && schedules?.length)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
            {t('text-no-delivery-time-found')}
          </span>
        </div>
      </RenderComponent>
    </div>
  );
}
