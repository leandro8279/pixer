import classNames from 'classnames';
import React from 'react';

import { RenderComponent } from '../common/render-component';
import { TriangleArrowDown } from '../icons/triangle-arrow-down';
import { TriangleArrowUp } from '../icons/triangle-arrow-up';

interface Props {
  ascending: boolean;
  isActive: boolean;
  className?: string;
  title: string | React.ReactNode;
}

export function TitleWithSort(props: Props) {
  const { title, ascending, isActive = true, className } = props;

  return (
    <span className={classNames('inline-flex items-center', className)}>
      <span title={`Sort by ${title}`}>{title}</span>

      <RenderComponent conditional={ascending}>
        <TriangleArrowUp
          width="9"
          className={classNames('shrink-0 text-gray-300 ms-1.5', { 'text-heading!': isActive })}
        />
      </RenderComponent>

      <RenderComponent conditional={!ascending}>
        <TriangleArrowDown
          width="9"
          className={classNames('shrink-0 text-gray-300 ms-1.5', { 'text-heading!': isActive })}
        />
      </RenderComponent>
    </span>
  );
}
