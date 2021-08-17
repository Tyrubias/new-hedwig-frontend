import { ReactElement, ReactNode } from 'react';
import { Navigate, PartialRouteObject, useRoutes } from 'react-router-dom';

import { Login } from '@hedwig/pages/Login';
import { useRequireAuth } from '@hedwig/hooks';
import { Eat } from '@hedwig/pages/Eat';
import { LoadingPage } from './Loading';

const PrivateElement = ({ children }: { children: ReactNode }): JSX.Element => {
  const auth = useRequireAuth();

  if (auth === null) {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export const Routes: PartialRouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/eat" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/eat/*',
    children: [
      {
        path: '/',
        element: (
          <PrivateElement>
            <Eat />
          </PrivateElement>
        ),
      },
    ],
  },
];

const AppRoutes = (): ReactElement | null => useRoutes(Routes);

export default AppRoutes;
