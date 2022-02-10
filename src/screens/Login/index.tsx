import React from 'react';

import ShapePng from '@assets/shape.png';
import LogoSvg from '@assets/logo.svg';
import { LoginButton } from '@components/LoginButton';
import { Container, Title } from './styles';

export const Login: React.FC = () => {
  return (
    <Container source={ShapePng} resizeMode="cover">
      <LogoSvg height={120} />
      <Title>Bem-vindo,{'\n'}este é o Leia-me.</Title>

      <LoginButton title="Entrar com o Google" />
    </Container>
  );
};
