import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type ImageProps = {
  type: 'primary' | 'secondary';
};

const typeStyles = {
  primary: css`
    width: ${RFValue(96)}px;
    height: ${RFValue(144)}px;
    border-radius: 8px;
  `,
  secondary: css`
    width: ${RFValue(144)}px;
    height: ${RFValue(216)}px;
  `,
};

export const Container = styled.Image<ImageProps>`
  ${({ type }) => typeStyles[type]}
`;

export const Template = styled.View<ImageProps>`
  ${({ type }) => typeStyles[type]}
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_100};
  justify-content: center;
`;

export const TemplateText = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_100};
`;
