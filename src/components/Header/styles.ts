import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  padding: ${Number(StatusBar.currentHeight) + 24}px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const UserArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarTemplate = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  justify-content: center;
  align-items: center;
`;

export const UserIcon = styled(Feather).attrs({
  name: 'user',
  size: 32,
})`
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Avatar = styled.Image`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Greetings = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};

  margin-left: 8px;
`;
