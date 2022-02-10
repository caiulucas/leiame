import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ImageBackground`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_500};
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND};

  margin: 56px 16px 40px;
`;
