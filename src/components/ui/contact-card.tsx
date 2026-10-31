import classNames from 'classnames';

interface Props {
  number: any;
  checked?: boolean;
}

export function ContactCard(props: Props) {
  const { number, checked } = props;
  return (
    <div
      className={classNames('relative p-4 h-full rounded border cursor-pointer group hover:border-accent', {
        'border-accent shadow-sm bg-light': checked,
        'bg-gray-100 border-transparent': !checked,
      })}
    >
      <p className="text-sm text-heading font-semibold capitalize">{number}</p>
    </div>
  );
}
