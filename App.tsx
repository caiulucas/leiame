import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
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
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={themes}>
      <HooksProvider>
        <StatusBar translucent backgroundColor="transparent" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </HooksProvider>
    </ThemeProvider>
  );
}
