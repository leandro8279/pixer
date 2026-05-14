import type { ReactNode } from 'react';

interface RenderComponentProps {
  conditional: any;
  children: ReactNode;
}

export default function RenderComponent({ conditional, children }: RenderComponentProps) {
  if (!conditional) return null;
  return <>{children}</>;
}
