import 'react-datepicker/dist/react-datepicker.css';

import classNames from 'classnames';
import { format } from 'date-fns';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { RenderComponent } from '@/components/common/render-component';
import { ValidationError } from '@/components/ui/form-validation-error';
import { TooltipLabel } from '@/components/ui/tooltip-label';

interface Props {
  control: any;
  minDate?: Date;
  maxDate?: Date;
  endDate?: Date;
  startDate?: Date;
  locale?: string;
  disabled?: boolean;
  placeholder?: string;
  todayButton?: string;
  name: string;
  label?: string;
  toolTipText?: string;
  required?: boolean;
  error?: string;
  dateFormat?: string;
  className?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
  timeCaption?: string;
  filterTime?: any;
}

export function DatePicker(props: Props) {
  const { placeholder = 'Start Date', todayButton = 'Today', ...rest1 } = props;
  const { control, minDate, startDate, locale, disabled, name, label, toolTipText, ...rest2 } = rest1;
  const { required, error, dateFormat, className, maxDate, endDate, showTimeSelect, timeFormat, timeIntervals, timeCaption, filterTime, ...rest3 } =
    rest2;

  return (
    <React.Fragment>
      <RenderComponent conditional={label}>
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
        />
      </RenderComponent>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <ReactDatePicker
              {...field}
              minDate={minDate}
              selected={(field?.value ? new Date(field?.value) : '') as any}
              startDate={new Date(startDate as Date)}
              locale={locale}
              todayButton={todayButton}
              placeholderText={placeholder}
              disabled={disabled}
              className={className}
              maxDate={maxDate}
              endDate={endDate}
              {...(showTimeSelect && {
                showTimeSelect: showTimeSelect,
                timeFormat: timeFormat,
                timeIntervals: timeIntervals,
                timeCaption: timeCaption,
                filterTime: filterTime,
              })}
              customInput={
                <div
                  className={twMerge(
                    classNames(
                      'border border-border-base px-4 h-12 flex items-center w-full rounded transition duration-300 ease-in-out text-heading text-sm cursor-pointer',
                      disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] select-none' : '',
                    ),
                  )}
                >
                  {field?.value ? format(new Date(field?.value), 'MMMM, dd yyyy pp') : field?.value}
                </div>
              } // use custom input to control input field focus
            />
          );
        }}
        {...rest3}
      />
      <ValidationError message={error} />
    </React.Fragment>
  );
}
