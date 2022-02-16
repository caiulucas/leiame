import React from 'react';

import { Container, Label, Text } from './styles';

type InfoTextProps = {
  label: string;
  type?: 'primary' | 'secondary';
  last?: boolean;
};

export const InfoText: React.FC<InfoTextProps> = ({
  label,
  type,
  last,
  children,
}) => {
  return (
    <Container type={type} style={last && { marginBottom: 0 }}>
      <Label type={type}>{label}</Label>
      <Text>{children}</Text>
    </Container>
  );
};

InfoText.defaultProps = {
  type: 'primary',
  last: false,
};
