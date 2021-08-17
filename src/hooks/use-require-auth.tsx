import { CustomAuthContext } from '@hedwig/shared/models';
import { useEffect } from 'react';
import { useAuth } from './use-auth';
import { useRouter } from './use-router';

export const useRequireAuth = (
  redirectUrl = '/login',
): CustomAuthContext | null => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth?.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router, redirectUrl]);

  return auth;
};
