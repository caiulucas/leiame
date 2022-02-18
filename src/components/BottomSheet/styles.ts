import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

type OptionProps = {
  selected: boolean;
};

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Option = styled(RectButton)<OptionProps>`
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.COLORS.PRIMARY_500 : theme.COLORS.BACKGROUND};
`;

export const OptionText = styled.Text<OptionProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme, selected }) =>
    selected ? theme.COLORS.BACKGROUND : theme.COLORS.TEXT};
`;
