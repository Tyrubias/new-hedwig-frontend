import firebase from 'firebase/app';
import { Location, State } from 'history';
import { NavigateFunction } from 'react-router-dom';

export interface CombinedFirebaseAuth {
  user: firebase.User | null;
  idToken: string | null;
}

export interface CustomAuthContext extends CombinedFirebaseAuth {
  signin: () => Promise<CombinedFirebaseAuth>;
  signinAgain: () => Promise<CombinedFirebaseAuth> | undefined;
  signout: () => Promise<void>;
}

export interface RouteInfo {
  push: (path: string, state?: State | undefined) => void;
  replace: (path: string, state?: State | undefined) => void;
  pathname: string;
  query: {
    [x: string]: string | string[] | null;
  };
  location: Location<State>;
  navigate: NavigateFunction;
}
