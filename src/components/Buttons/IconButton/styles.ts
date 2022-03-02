import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

type ContainerProps = {
  type: 'primary' | 'secondary';
};

export const Container = styled(RectButton)<ContainerProps>`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.SHAPE : theme.COLORS.BACKGROUND};
`;

export const Icon = styled(Feather).attrs({ size: RFValue(24) })`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
