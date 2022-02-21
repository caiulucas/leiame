import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Icon = styled(Feather).attrs({ size: RFValue(24) })`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
