import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useQueryString = (): [
  URLSearchParams,
  (params: Record<string, string>) => void
] => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const setQueryParams = useCallback(
    (params: Record<string, string>) => {
      const queryString = new URLSearchParams({
        ...Object.fromEntries(new URLSearchParams(location.search)),
        ...params,
      }).toString();

      navigate({
        pathname: location.pathname,
        search: `?${queryString}`,
      });
    },
    [location, navigate]
  );

  return [queryParams, setQueryParams];
};

export default useQueryString;
