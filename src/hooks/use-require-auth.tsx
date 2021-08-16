import { CustomAuthContext } from '@hedwig/shared/models';
import { useEffect } from 'react';
import { useAuth } from './use-auth';
import { useRouter } from './use-router';

export const useRequireAuth = (redirectUrl = '/login'): CustomAuthContext => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user == null) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
};
