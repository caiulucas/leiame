import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: ${RFValue(96)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONTS.LABEL};
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
  margin-top: ${RFValue(8)}px;
`;
