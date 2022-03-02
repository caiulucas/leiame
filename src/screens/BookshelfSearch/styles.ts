import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  margin: ${Number(StatusBar.currentHeight) + RFValue(24)}px ${RFValue(24)}px
    ${RFValue(8)}px;
`;

export const TitleArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
`;

export const InputArea = styled.View`
  flex-direction: row;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFValue(24)}px;
`;

export const SearchResult = styled.View``;
