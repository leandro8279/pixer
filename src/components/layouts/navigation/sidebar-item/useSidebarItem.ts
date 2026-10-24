import { useCallback, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'wouter';

interface Props {
  href: any;
  icon: any;
  label: string;
  childMenu: [];
  miniSidebar?: boolean;
}
export const useSidebarItem = (props: Props) => {
  const { label, childMenu } = props;
  const [location] = useLocation();
  const [searchParams] = useSearchParams();
  const sanitizedPath = location;

  const shop = searchParams.get('shop');
  const isParents = searchParams.get('parents');

  const isActive = useMemo(() => {
    if (isParents) {
      return isParents === label;
    }
    const lastIndex = location.lastIndexOf('/');
    if (label !== 'Settings') {
      return (
        location
          .substring(lastIndex + 1)
          .replace(/[^a-zA-Z ]/g, ' ')
          .trim()
          .toUpperCase() === label?.trim()?.toUpperCase()
      );
    }
    return location
      .trim()
      .toUpperCase()
      .includes(label?.trim()?.toUpperCase() ?? '');
  }, [location, isParents]);

  const [isOpen, setOpen] = useState<boolean>(isActive);

  const toggleCollapse = useCallback(() => {
    setOpen((prevValue) => !prevValue);
  }, [isOpen]);

  const onClick = useCallback(() => {
    if (Array.isArray(childMenu) && !!childMenu.length) {
      toggleCollapse();
    }
  }, [isOpen]);

  return { shop, isOpen, onClick, isParents, sanitizedPath };
};
