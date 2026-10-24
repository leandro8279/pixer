import ReactSelect, { Props } from 'react-select';

import { selectStyles } from './select.styles';

export function Select(props: Props) {
  const {} = props;
  return (
    <ReactSelect
      styles={selectStyles}
      {...props}
    />
  );
}
