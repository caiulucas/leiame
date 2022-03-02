import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { Search } from '@screens/Search';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator();

export const TabRoutes: React.FC = () => {
  const { COLORS } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.PRIMARY_500,
        tabBarInactiveTintColor: COLORS.PRIMARY_100,
        tabBarStyle: {
          height: 56,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={32} color={color} />
          ),
        }}
      />
      <Screen
        name="search"
        component={Search}
        initialParams={{ urlPath: '/volumes', searchOnLoad: false }}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="compass" size={32} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
