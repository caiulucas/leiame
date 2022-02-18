import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
`;

export const BookInfo = styled.View`
  flex: 1;
  margin-top: ${RFValue(8)}px;
  margin-left: ${RFValue(16)}px;
`;
export const ProgressArea = styled.View`
  margin-top: ${RFValue(16)}px;
`;

export const ProgressText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-top: ${RFValue(4)}px;
`;

export const ProgressSpan = styled(ProgressText)`
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;
