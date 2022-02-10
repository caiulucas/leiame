import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthResponse = AuthSession.AuthSessionResult & {
  params: { access_token: string };
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
};

WebBrowser.maybeCompleteAuthSession();

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
  }, []);

  const signIn = useCallback(async () => {
    try {
      const authParams = new URLSearchParams({
        client_id:
          '806197974212-gi140t5ooeo363nmb85jffogngd32tf1.apps.googleusercontent.com',
        redirect_uri: 'https://auth.expo.io/@lienscarlet/leiame',
        response_type: 'token',
        scope: encodeURI('profile email'),
      }).toString();

      const { type, params } = (await AuthSession.startAsync({
        authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${authParams}`,
      })) as AuthResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();
        const authorizedUser: User = { ...userInfo, avatar: userInfo.picture };

        setUser(authorizedUser);
        await AsyncStorage.setItem(storageKey, JSON.stringify(authorizedUser));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const value = useMemo(() => ({ user, signIn }), [user, signIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
