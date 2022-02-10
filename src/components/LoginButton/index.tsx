import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title } from './styles';

type ButtonProps = RectButtonProps & {
  title: string;
};

export const LoginButton: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon name="google" size={24} color="black" />
      <Title>{title}</Title>
    </Container>
  );
};
