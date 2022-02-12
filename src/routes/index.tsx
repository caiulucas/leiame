import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '@screens/SignIn';
import { useAuth } from '@hooks/auth';
import { TabRoutes } from './tab.routes';

export const Routes: React.FC = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.email ? <TabRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
