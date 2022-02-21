import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container } from './styles';

type SeparatorProps = {
  paddingHorizontal?: number;
};

export const Separator: React.FC<SeparatorProps> = ({
  paddingHorizontal = 0,
}) => {
  return (
    <Container style={{ paddingHorizontal: RFValue(paddingHorizontal) }} />
  );
};
