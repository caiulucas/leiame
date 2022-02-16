import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-right: 8px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => {
  return { placeholderColor: theme.COLORS.PRIMARY_100 };
})`
  flex: 1;
  padding: 0 24px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const SearchButton = styled(BorderlessButton)`
  margin-right: 16px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather).attrs({
  name: 'search',
  size: 24,
})`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
