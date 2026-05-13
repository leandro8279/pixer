import RenderComponent from '@/components/common/render-component';

type Props = {
  className?: string;
  title?: string;
  details?: string | JSX.Element;
  [key: string]: unknown;
};

export function Description({ title, details, className, ...props }: Props) {
  return (
    <div className={className} {...props}>
      <RenderComponent conditional={!!title}>
        <h4 className="text-base font-semibold text-body-dark mb-2">{title}</h4>
      </RenderComponent>
      <RenderComponent conditional={!!details}>
        <p className="text-sm text-body">{details}</p>
      </RenderComponent>
    </div>
  );
}

export default Description;
