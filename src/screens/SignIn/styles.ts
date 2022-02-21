import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ImageBackground`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(24)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND};

  margin: ${RFValue(56)}px ${RFValue(16)}px ${RFValue(40)}px;
`;
