import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  margin: ${Number(StatusBar.currentHeight) + 24}px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
`;

export const SearchResult = styled.View``;
