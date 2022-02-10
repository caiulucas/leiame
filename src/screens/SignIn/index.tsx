import React from 'react';

import ShapePng from '@assets/shape.png';
import LogoSvg from '@assets/logo.svg';
import { SignInButton } from '@components/SignInButton';
import { Container, Title } from './styles';

export const SignIn: React.FC = () => {
  return (
    <Container source={ShapePng} resizeMode="cover">
      <LogoSvg height={120} />
      <Title>Bem-vindo,{'\n'}este é o Leia-me.</Title>

      <SignInButton title="Entrar com o Google" />
    </Container>
  );
};
