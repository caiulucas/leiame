import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled(RectButton)`
  height: 48px;
  width: 100%;
  border-radius: 24px;

  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Icon = styled(MaterialCommunityIcons).attrs({ name: 'google' })`
  position: absolute;
  height: 24px;
  bottom: 12px;
  left: 16px;

  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;

export const Title = styled.Text`
  width: 100%;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
  text-align: center;
`;
