import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled(RectButton)`
  height: ${RFValue(48)}px;
  width: 100%;
  border-radius: ${RFValue(24)}px;

  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Icon = styled(MaterialCommunityIcons).attrs({ name: 'google' })`
  position: absolute;
  height: ${RFValue(24)}px;
  bottom: ${RFValue(12)}px;
  left: ${RFValue(16)}px;

  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const Title = styled.Text`
  width: 100%;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
  text-align: center;
`;
