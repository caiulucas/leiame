import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Book } from '@screens/Book';
import { TabRoutes } from './tab.routes';
import { RootStackParamList } from './types';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const StackRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="tab" component={TabRoutes} />
      <Screen name="book" component={Book} />
    </Navigator>
  );
};
