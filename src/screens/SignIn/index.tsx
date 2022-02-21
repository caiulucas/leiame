import React from 'react';

import ShapePng from '@assets/shape.png';
import LogoSvg from '@assets/logo.svg';
import { SignInButton } from '@components/Buttons/SignInButton';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Title } from './styles';

export const SignIn: React.FC = () => {
  return (
    <Container source={ShapePng} resizeMode="cover">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LogoSvg height={RFValue(120)} />
      <Title>Bem-vindo,{'\n'}este é o Leia-me.</Title>

      <SignInButton title="Entrar com o Google" />
    </Container>
  );
};
