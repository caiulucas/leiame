import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${RFValue(16)}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const BookTemplate = styled.View`
  width: ${RFValue(96)}px;
  height: ${RFValue(144)}px;
  border-radius: 8px;
  border: 0.3px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
  justify-content: center;
`;

export const BookTemplateText = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.PRIMARY_100};
`;

export const BookImage = styled.Image`
  width: ${RFValue(96)}px;
  height: ${RFValue(144)}px;
  border-radius: 8px;
`;

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
