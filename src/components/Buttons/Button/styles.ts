import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  height: ${RFValue(48)}px;
  width: 100%;
  border-radius: ${RFValue(24)}px;

  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Icon = styled(Feather).attrs({
  name: 'chevron-down',
  size: RFValue(24),
})`
  position: absolute;
  bottom: ${RFValue(12)}px;
  right: ${RFValue(16)}px;

  color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Title = styled.Text`
  width: 100%;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.BACKGROUND};
  text-align: center;
`;
