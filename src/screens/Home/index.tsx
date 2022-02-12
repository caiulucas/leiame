import React, { useEffect } from 'react';
import { Header } from '@components/Header';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from './styles';

export const Home: React.FC = () => {
  useEffect(() => {
    async function clearAsyncStorage() {
      await AsyncStorage.clear();
    }
    clearAsyncStorage();
  }, []);

  return (
    <Container>
      <Header />
    </Container>
  );
};
