import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
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

export const AddBookCard = styled(RectButton)`
  margin-left: ${RFValue(24)}px;
  width: ${RFValue(96)}px;
  height: ${RFValue(144)}px;
  border-radius: ${RFValue(8)}px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Icon = styled(Feather).attrs({
  name: 'plus',
})`
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
