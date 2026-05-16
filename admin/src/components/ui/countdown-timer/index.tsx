import React from 'react';
import Countdown from 'react-countdown';

import RenderComponent from '@/components/common/render-component';
import { SeparatorIcon } from '@/components/icons/timer-separator';

import { cn } from '@/utils/util';

type CountdownTimerProps = {
  date: Date | undefined | '';
  title?: string;
  className?: string;
};

const CompletionMessage = () => <span className='text-sm'>You are good to go!</span>;

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const renderer = ({ days, hours, minutes, seconds, completed }: Props, props: { className?: string }) => {
  if (completed) {
    return <CompletionMessage />;
  } else {
    return (
      <div
        className={cn(
          'flex gap-2 text-lg text-accent [&>p]:rounded [&>p]:bg-accent [&>p]:p-3 [&>p]:text-sm [&>p]:font-semibold [&>p]:text-white [&>span]:self-center',
          props.className!,
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

export function CountdownTimer(props: CountdownTimerProps) {
  const { date, title, className } = props;

  return (
    <React.Fragment>
      <RenderComponent conditional={title}>
        <h4 className='text-xl font-semibold text-muted-black'>{title}</h4>
      </RenderComponent>
      <Countdown date={date} renderer={(props) => renderer(props, { className })} />
    </React.Fragment>
  );
}
