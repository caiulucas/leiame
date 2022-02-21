import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type GradientProps = {
  percentage: string;
};

export const Container = styled.View`
  height: ${RFValue(4)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: ${RFValue(4)}px;
`;

export const Gradient = styled(LinearGradient).attrs(({ theme }) => {
  return {
    colors: theme.COLORS.GRADIENT,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  };
})<GradientProps>`
  width: ${({ percentage }) => percentage}%;
  height: ${RFValue(4)}px;
  border-radius: ${RFValue(4)}px;
`;
