import * as socialIcons from '@/components/icons/social';
import { socialIcon } from '@/settings/site.settings';
import { getIcon } from '@/utils/get-icon';

export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex items-center text-body space-s-4">
      <span className="flex items-center justify-center w-4 h-4">
        {getIcon({ iconList: socialIcons, iconName: item.value, className: 'w-4 h-4' })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});
