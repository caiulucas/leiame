import { IconButton } from '@components/Buttons/IconButton';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  border-bottom-left-radius: 64px;
  padding: ${Number(StatusBar.currentHeight) + 48}px 24px 24px;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled(IconButton)`
  position: absolute;
  top: ${Number(StatusBar.currentHeight) + 24}px;
  left: 24px;
`;

export const StarGroup = styled.View`
  flex-direction: row;
  margin: 16px 0;
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
  margin-top: 8px;
`;

export const Content = styled.View`
  padding: 40px 24px 0px;
`;

export const SynopsisArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
  padding: 32px 0 16px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
  line-height: ${RFValue(21)}px;
  text-align: justify;
  margin: 16px 0;
`;

export const ButtonArea = styled.View`
  align-items: flex-end;
`;

export const InfoArea = styled.View`
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MoreBooksArea = styled.View`
  margin-bottom: 64px;
`;

export const TitleArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 24px;
`;
