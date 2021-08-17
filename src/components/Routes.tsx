import { ReactElement, ReactNode } from 'react';
import { Navigate, PartialRouteObject, useRoutes } from 'react-router-dom';

import { Login } from '@hedwig/pages/Login';
import { useAuth } from '@hedwig/hooks';
import { Eat } from '@hedwig/pages/Eat';

const PrivateElement = ({ children }: { children: ReactNode }): JSX.Element => {
  const auth = useAuth();

  if (auth?.user == null) {
    return <h1>Loading...</h1>;
  }

  if (auth == null || typeof auth === 'undefined') {
    return <Navigate to="/login" />;
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
