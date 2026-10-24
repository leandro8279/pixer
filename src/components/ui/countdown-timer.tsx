import classNames from 'classnames';
import Countdown from 'react-countdown';
import { twMerge } from 'tailwind-merge';

import { RenderComponent } from '@/components/common/render-component';
import { SeparatorIcon } from '@/components/icons/timer-separator';

interface Props {
  date: Date | undefined | '';
  title?: string;
  className?: string;
}

const CompletionMessage = () => <span className="text-sm">You are good to go!</span>;

const renderer = (
  { days, hours, minutes, seconds, completed }: { days: number; hours: number; minutes: number; seconds: number; completed: boolean },
  // @ts-ignore
  props,
) => {
  if (completed) {
    // Render a completed state
    return <CompletionMessage />;
  } else {
    // Render a countdown
    return (
      <div
        className={twMerge(
          classNames(
            'flex gap-2 text-lg text-accent [&>p]:rounded [&>p]:bg-accent [&>p]:p-3 [&>p]:text-sm [&>p]:font-semibold [&>p]:text-white [&>span]:self-center',
            props?.className,
          ),
        )}
      >
        <p>{days}d</p>
        <span>
          <SeparatorIcon />
        </span>
        <p>{hours}h</p>
        <span>
          <SeparatorIcon />
        </span>
        <p>{minutes}m</p>
        <span>
          <SeparatorIcon />
        </span>
        <p>{seconds}s</p>
      </div>
    );
  }
};

export function CountdownTimer(props: Props) {
  const { date, title, className } = props;
  return (
    <>
      <RenderComponent conditional={title}>
        <h4 className="text-xl font-semibold text-muted-black">{title}</h4>
      </RenderComponent>
      <Countdown
        date={date}
        renderer={(props) => renderer(props, { className })}
      />
    </>
  );
}
