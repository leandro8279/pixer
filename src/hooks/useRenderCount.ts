import { useRef } from "react";

export function useRenderCount(name: string) {
  const count = useRef(0);

  count.current += 1;

  console.log(`[${name}] renderizou ${count.current}x`);

  return count.current;
}
