import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title } from './styles';

type ButtonProps = RectButtonProps & {
  title: string;
};

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Icon />
    </Container>
  );
};
