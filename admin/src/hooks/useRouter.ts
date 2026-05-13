import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

export function useRouter() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return {
    locale: i18n.language,
    pathname: location.pathname,
    query: Object.fromEntries(new URLSearchParams(location.search)),
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
    back: () => navigate(-1),
  };
}
