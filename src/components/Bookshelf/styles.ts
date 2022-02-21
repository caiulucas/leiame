import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const TitleArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${RFValue(16)}px ${RFValue(24)}px;
`;
