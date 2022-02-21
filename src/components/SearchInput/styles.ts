import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-right: ${RFValue(8)}px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => {
  return { placeholderColor: theme.COLORS.PRIMARY_100 };
})`
  flex: 1;
  padding: 0 ${RFValue(24)}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const SearchButton = styled(BorderlessButton)`
  margin-right: ${RFValue(16)}px;
  height: ${RFValue(48)}px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather).attrs({
  name: 'search',
  size: RFValue(24),
})`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
