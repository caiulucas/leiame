import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { GOOGLE_WEB_CLIEND_ID } from 'react-native-dotenv';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

type User = {
  name: string;
  email: string;
  avatar: string | null;
  token: string;
};

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    async function fetchUser() {
      const { currentUser } = auth();
      const { accessToken } = await GoogleSignin.getTokens();

      if (currentUser?.email && currentUser.displayName) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          avatar: currentUser.photoURL,
          token: accessToken,
        });
      }
    }

    fetchUser();

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/books'],
      webClientId: GOOGLE_WEB_CLIEND_ID,
    });
  }, []);

  const signIn = useCallback(async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      const { accessToken } = await GoogleSignin.getTokens();

      if (response.user.email && response.user.displayName) {
        const authenticatedUser: User = {
          name: response.user.displayName,
          email: response.user.email,
          avatar: response.user.photoURL,
          token: accessToken,
        };

        setUser(authenticatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    await GoogleSignin.signOut();
    await auth().signOut();
    setUser({} as User);
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
