import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 0 ${RFValue(24)}px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-top: ${RFValue(8)}px;
  text-align: center;
`;

export const Span = styled(Title)`
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Input = styled.TextInput.attrs(({ theme }) => {
  return { placeholderColor: theme.COLORS.PRIMARY_100 };
})`
  width: 100%;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin: ${RFValue(24)}px 0 ${RFValue(48)}px;
  text-align: center;
`;
