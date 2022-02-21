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
    <Container style={{ marginBottom: RFValue(marginBottom || 0) }} type={type}>
      {children}
    </Container>
  );
};
