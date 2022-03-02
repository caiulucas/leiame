import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container } from './styles';

type TitleProps = {
  marginBottom?: number;
  marginLeft?: number;
  type: 'h1' | 'h2' | 'h3';
};

export const Title: React.FC<TitleProps> = ({
  marginBottom = 0,
  marginLeft = 0,
  type,
  children,
}) => {
  return (
    <Container
      style={{
        marginBottom: RFValue(marginBottom),
        marginLeft: RFValue(marginLeft),
      }}
      type={type}
    >
      {children}
    </Container>
  );
};
