import { useLocation, useSearchParams } from 'wouter';

export const useRouter = () => {
  const [, navigate] = useLocation();
  const [searchParams] = useSearchParams();

  return {
    searchParams,
    back: () => window.history.back(),
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
  };
};
