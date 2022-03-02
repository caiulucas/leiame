import { IconButton } from '@components/Buttons/IconButton';
import { StatusBar } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const LoaderArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator.attrs(({ theme }) => {
  return { color: theme.COLORS.PRIMARY_500, size: RFValue(48) };
})``;

export const ScrollContent = styled.ScrollView``;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  border-bottom-left-radius: ${RFValue(64)}px;
  padding: ${Number(StatusBar.currentHeight) + RFValue(48)}px ${RFValue(24)}px
    ${RFValue(24)}px;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled(IconButton)`
  position: absolute;
  top: ${Number(StatusBar.currentHeight) + RFValue(24)}px;
  left: ${RFValue(24)}px;
`;

export const StarGroup = styled.View`
  flex-direction: row;
  margin: ${RFValue(16)}px 0;
`;

export const BookTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
  text-align: center;
`;

export const Author = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.LABEL};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-top: ${RFValue(8)}px;
`;

export const PercentageArea = styled.View`
  margin-bottom: ${RFValue(8)}px;
`;

export const PercentageText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-top: ${RFValue(8)}px;
`;

export const PercentageSpan = styled(PercentageText)`
  color: ${({ theme }) => theme.COLORS.PRIMARY_500};
`;

export const Content = styled.View`
  padding: ${RFValue(40)}px ${RFValue(24)}px 0px;
`;

export const SynopsisArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
  padding: ${RFValue(32)}px 0 ${RFValue(16)}px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
  line-height: ${RFValue(21)}px;
  text-align: justify;
  margin: ${RFValue(16)}px 0;
`;

export const ButtonArea = styled.View`
  align-items: flex-end;
`;

export const InfoArea = styled.View`
  padding: ${RFValue(16)}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;
