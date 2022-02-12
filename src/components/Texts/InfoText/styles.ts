import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type LabelProps = {
  color?: 'primary' | 'secondary';
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(4)}px;
`;

export const Label = styled.Text<LabelProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONTS.LABEL};
  color: ${({ theme, color }) =>
    color === 'primary' ? theme.COLORS.PRIMARY_900 : theme.COLORS.TEXT};
`;

export const Text = styled.Text`
  margin-left: ${RFValue(8)}px;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;
