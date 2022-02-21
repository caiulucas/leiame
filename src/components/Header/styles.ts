import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  padding: ${Number(StatusBar.currentHeight) + RFValue(24)}px ${RFValue(24)}px
    ${RFValue(23)}px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const UserArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarTemplate = styled.View`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  justify-content: center;
  align-items: center;
`;

export const UserIcon = styled(Feather).attrs({
  name: 'user',
  size: RFValue(32),
})`
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Avatar = styled.Image`
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Greetings = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};

  margin-left: ${RFValue(8)}px;
`;
