import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { QuoteIcon } from '@/components/icons/quote';
import ReadMore from './truncate';
import RenderComponent from '@/components/common/render-component';

type BlockQuoteProps = {
  quote: string;
  className?: string;
};

export function BlockQuote({ quote, className, ...rest }: BlockQuoteProps) {
  return (
    <blockquote
      {...rest}
      className={twMerge(
        classNames(
          'relative pl-2 text-xs font-normal leading-[180%] text-muted-black',
          className
        )
      )}
    >
      <RenderComponent conditional={!!quote}>
        <div className="absolute -top-px -left-1.5 text-[#F8F8F8]">
          <QuoteIcon />
        </div>
      </RenderComponent>
      <p className="relative z-10">
        <ReadMore character={150}>{quote}</ReadMore>
      </p>
    </blockquote>
  );
}

export default BlockQuote;
