import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { MapPin } from '@/components/icons/map-pin';
import { Loader } from '@/components/ui/loader/loader';
import useLocation from '@/utils/use-location';
import { Autocomplete } from '@react-google-maps/api';

import type { GoogleMapLocation } from '@/types';
interface Props {
  icon?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  data?: GoogleMapLocation;
  onChangeCurrentLocation?: () => void;
}

export function GooglePlacesAutocomplete(props: Props) {
  const { onChange, onChangeCurrentLocation, data, disabled = false, icon = false } = props;
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [onLoad, onUnmount, onPlaceChanged, isLoaded, loadError] = useLocation({ onChange, onChangeCurrentLocation, setInputValue });

  useEffect(() => {
    const getLocation = data?.formattedAddress;
    setInputValue(getLocation!);
  }, [data]);

  if (loadError) {
    return <div>{t('text-map-cant-load')}</div>;
  }

  if (isLoaded) {
    return (
      <div className="relative">
        <RenderComponent conditional={icon}>
          <div className="absolute top-0 left-0 flex h-12 w-10 items-center justify-center text-gray-400">
            <MapPin className="w-4.5" />
          </div>
        </RenderComponent>

        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          onUnmount={onUnmount}
          fields={['address_components', 'geometry.location', 'formatted_address']}
          types={['address']}
        >
          <input
            type="text"
            placeholder={t('form:placeholder-search-location')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`flex h-12 w-full appearance-none items-center rounded border border-border-base text-sm text-heading transition duration-300 ease-in-out  focus:border-accent focus:outline-none focus:ring-0 ${
              disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : ''
            } ${icon ? 'pe-4 ps-9' : 'px-4'}`}
            disabled={disabled}
          />
        </Autocomplete>
      </div>
    );
  }

  return (
    <Loader
      simple={true}
      className="h-6 w-6"
    />
  );
}
