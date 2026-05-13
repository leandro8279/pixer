import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderComponent from '@/components/common/render-component';

type ReadMoreProps = {
  more?: string;
  less?: string;
  character: number;
  children: string;
};

export function ReadMore({
  children,
  more,
  less,
  character = 150,
}: ReadMoreProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setExpanded((prev) => !prev);
  };

  if (!children) return null;

  return (
    <>
      {children.length < character || expanded
        ? children
        : children.substring(0, character) + '...'}
      <RenderComponent conditional={children.length > character && !expanded}>
        <>
          <br />
          <span className="mt-2 inline-block">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#009e7f', fontWeight: 700 }}
            >
              {more ? more : t('common:text-read-more')}
            </a>
          </span>
        </>
      </RenderComponent>
      <RenderComponent conditional={children.length > character && expanded}>
        <>
          <br />
          <span className="mt-2 inline-block">
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#009e7f', fontWeight: 700 }}
            >
              {less ? less : t('common:text-less')}
            </a>
          </span>
        </>
      </RenderComponent>
    </>
  );
}

export default ReadMore;
