import type React from "react";

interface Props {
  conditional: any;
  children: React.ReactNode;
}

export function RenderComponent({ children, conditional }: Props) {
  return conditional && children;
}
