import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { State } from 'history';
import queryString from 'query-string';
import { RouteInfo } from '@hedwig/shared/models';

export const useRouter = (): RouteInfo => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(
    () => ({
      push: (path: string, state?: State): void =>
        navigate(path, { state: state }),
      replace: (path: string, state?: State): void =>
        navigate(path, { replace: true, state: state }),
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      location,
      navigate,
    }),
    [params, location, navigate],
  );
};
