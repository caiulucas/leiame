import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const BookInfo = styled.View`
  flex: 1;
  margin-top: ${RFValue(16)}px;
  margin-left: ${RFValue(16)}px;
`;

export const Button = styled(RectButton)`
height: ${RFValue(24)}px;
width: ${RFValue(24)}px
border-radius: ${RFValue(12)}px;
position: absolute;
/* left: 96%; */
right: 0px;
bottom: ${RFValue(8)}px;
align-items :center;
justify-content: center;
background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Icon = styled(Feather).attrs({ name: 'arrow-right', size: 16 })`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
