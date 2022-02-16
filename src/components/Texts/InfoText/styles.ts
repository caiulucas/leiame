import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type InfoTextProps = {
  type?: 'primary' | 'secondary';
};

export const Container = styled.View<InfoTextProps>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ type }) => RFValue(type === 'primary' ? 16 : 4)}px;
`;

export const Label = styled.Text<InfoTextProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONTS.LABEL};
  color: ${({ theme, type }) =>
    type === 'primary' ? theme.COLORS.TEXT : theme.COLORS.PRIMARY_900};
`;

export const Text = styled.Text`
  margin-left: ${RFValue(8)}px;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;
