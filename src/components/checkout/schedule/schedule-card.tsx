import classNames from 'classnames';

interface Props {
  schedule: any;
  checked: boolean;
}

export function ScheduleCard(props: Props) {
  const { checked, schedule } = props;
  return (
    <div
      className={classNames('relative p-4 h-full rounded border cursor-pointer group hover:border-accent', {
        'border-accent shadow-sm': checked,
        'bg-gray-100 border-transparent': !checked,
      })}
    >
      <span className="text-sm text-heading font-semibold block mb-2">{schedule.title}</span>
      <span className="text-sm text-heading block">{schedule.description}</span>
    </div>
  );
}
