import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/books'],
      webClientId:
        '239213670592-b9rto0m2guemr1ostlpchsnkhehl9cso.apps.googleusercontent.com',
      // offlineAccess: true,
    });

    async function loadUser() {
      const loadedUser = await AsyncStorage.getItem(storageKey);
      if (loadedUser) setUser(JSON.parse(loadedUser));
    }

    loadUser();
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

        setUser(authenticatedUser);
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(authenticatedUser),
        );
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
