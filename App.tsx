import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';
import { HooksProvider } from '@hooks/index';
import { Routes } from '@routes/index';
import { StatusBar } from 'react-native';
import themes from './src/themes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={themes}>
      <HooksProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Routes />
        </GestureHandlerRootView>
      </HooksProvider>
    </ThemeProvider>
  );
}
