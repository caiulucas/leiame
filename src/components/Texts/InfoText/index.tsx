import React from 'react';

import { Container, Label, Text } from './styles';

type InfoTextProps = {
  label: string;
  color?: 'primary' | 'secondary';
  last?: boolean;
};

export const InfoText: React.FC<InfoTextProps> = ({
  label,
  color,
  last,
  children,
}) => {
  return (
    <Container style={last && { marginBottom: 0 }}>
      <Label color={color}>{label}</Label>
      <Text>{children}</Text>
    </Container>
  );
};

InfoText.defaultProps = {
  color: 'primary',
  last: false,
};
