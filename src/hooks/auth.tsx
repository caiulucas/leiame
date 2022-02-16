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

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

// type AuthResponse = AuthSession.AuthSessionResult & {
//   params: { access_token: string };
// };

type User = {
  name: string;
  email: string;
  avatar: string | null;
};

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
};

const storageKey = '@leiame:user';
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    async function loadUser() {
      const loadedUser = await AsyncStorage.getItem(storageKey);
      if (loadedUser) setUser(JSON.parse(loadedUser));
    }

    loadUser();

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

      if (response.user.email && response.user.displayName) {
        const authenticatedUser: User = {
          name: response.user.displayName,
          email: response.user.email,
          avatar: response.user.photoURL,
        };

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(authenticatedUser),
        );
        setUser(authenticatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const value = useMemo(() => ({ user, signIn }), [user, signIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
