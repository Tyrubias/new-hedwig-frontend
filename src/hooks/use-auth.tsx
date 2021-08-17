import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { CombinedFirebaseAuth, CustomAuthContext } from '@hedwig/shared/models';

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN } from '@hedwig/config';

const hedwigFirebaseApp = firebase.initializeApp(
  {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
  },
  'Hedwig',
);

firebase
  .auth(hedwigFirebaseApp)
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(() => {});

// Following code is adapted from https://usehooks.com/useAuth/
const authContext = createContext<CustomAuthContext | null>(null);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = (): CustomAuthContext | null => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth = (): CustomAuthContext => {
  const [user, setUser] = useState<boolean | firebase.User | null>(
    firebase.auth(hedwigFirebaseApp).currentUser,
  );
  const [idToken, setIdToken] = useState<string | null>(null);
  const samlProvider = new firebase.auth.SAMLAuthProvider(
    'saml.rice-shibboleth',
  );

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (): Promise<CombinedFirebaseAuth> => {
    return await firebase
      .auth(hedwigFirebaseApp)
      .signInWithPopup(samlProvider)
      .then(
        async ({ user }) =>
          await Promise.all([Promise.resolve(user), user?.getIdToken()]),
      )
      .then((result) => {
        const [user, idToken] = result;
        setUser(user);
        setIdToken(idToken ?? null);

        return { user: user, idToken: idToken ?? null };
      });
  };

  const signinAgain = (): Promise<CombinedFirebaseAuth> | undefined => {
    return firebase
      .auth(hedwigFirebaseApp)
      .currentUser?.reauthenticateWithPopup(samlProvider)
      .then(
        async ({ user }) =>
          await Promise.all([Promise.resolve(user), user?.getIdToken()]),
      )
      .then((result) => {
        const [user, idToken] = result;
        setUser(user);
        setIdToken(idToken ?? null);

        return { user: user, idToken: idToken ?? null };
      });
  };

  const signout = async (): Promise<void> => {
    return await firebase
      .auth(hedwigFirebaseApp)
      .signOut()
      .then(() => {
        setUser(false);
        setIdToken(null);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    firebase
      .auth(hedwigFirebaseApp)
      .currentUser?.getIdToken()
      .then((token) => setIdToken(token));

    const unsubscribe = firebase
      .auth(hedwigFirebaseApp)
      .onIdTokenChanged((user) => {
        if (user != null) {
          setUser(user);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          user.getIdToken().then((res) => setIdToken(res));
        } else {
          setUser(false);
          setIdToken(null);
        }
      });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    idToken,
    signin,
    signinAgain,
    signout,
  };
};
