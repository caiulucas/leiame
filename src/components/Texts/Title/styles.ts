import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type ContainerProps = {
  type: 'h1' | 'h2' | 'h3';
};

const fontSizes = { h1: 20, h2: 18, h3: 16 };

export const Container = styled.Text<ContainerProps>`
  font-size: ${({ type }) => RFValue(fontSizes[type])}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;
