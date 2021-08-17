import { ReactNode } from 'react';
import { Navigate, PartialRouteObject } from 'react-router-dom';

import { Login } from '@hedwig/pages/Login';
import { useAuth } from '@hedwig/hooks';
import { Eat } from '@hedwig/pages/Eat';

const PrivateElement = ({ children }: { children: ReactNode }): JSX.Element => {
  const auth = useAuth();

  if (auth == null || typeof auth === 'undefined' || auth?.user == null) {
    return (
      <>
        <h1>Not Logged In</h1>
        <button onClick={auth?.signin}>Please Login Again</button>
      </>
    );
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
