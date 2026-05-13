import RenderComponent from '@/components/common/render-component';

type ReadMoreProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText?: string;
  character: number;
  children: string;
  hideButton?: boolean;
};

export function Truncate({
  children,
  onClick,
  character = 200,
  buttonText = 'See More',
  hideButton = false,
}: ReadMoreProps) {
  if (!children) return null;

  return (
    <>
      {children.length < character
        ? children
        : children.substring(0, character) + '...'}
      <RenderComponent conditional={!hideButton && children.length > character}>
        <>
          ...
          <button
            className="ms-1 text-sm font-semibold text-accent hover:text-accent-hover outline-none focus:outline-none"
            onClick={onClick}
          >
            {buttonText}
          </button>
        </>
      </RenderComponent>
    </>
  );
}

export default Truncate;
