import { lazy, Suspense } from 'react';

const Charts = lazy(() => import('react-apexcharts'));

export function Chart({ ...props }) {
  return (
    <Suspense fallback={null}>
      <Charts {...props} />
    </Suspense>
  );
}

export default Chart;
