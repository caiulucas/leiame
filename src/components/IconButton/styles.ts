import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled(RectButton)`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Icon = styled(Feather).attrs({ size: 24 })`
  color: ${({ theme }) => theme.COLORS.PRIMARY_900};
`;
