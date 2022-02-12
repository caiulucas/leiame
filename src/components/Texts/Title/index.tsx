import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container } from './styles';

type TitleProps = {
  marginBottom?: number;
  type: 'h1' | 'h2' | 'h3';
};

export const Title: React.FC<TitleProps> = ({
  marginBottom,
  type,
  children,
}) => {
  return (
    <Container
      style={{ marginBottom: RFValue(Number(marginBottom)) }}
      type={type}
    >
      {children}
    </Container>
  );
};

Title.defaultProps = {
  marginBottom: 0,
};
