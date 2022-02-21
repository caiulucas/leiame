import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { BorderView, Container, Icon, Title } from './styles';

type ButtonProps = RectButtonProps & {
  title: string;
  marginBottom?: number;
  hasIcon?: boolean;
  outline?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  marginBottom = 0,
  hasIcon = true,
  outline = false,
  ...rest
}) => {
  return (
    <Container
      outline={outline}
      style={{ marginBottom: RFValue(marginBottom) }}
      {...rest}
    >
      <BorderView>
        <Title outline={outline}>{title}</Title>
        {hasIcon && <Icon />}
      </BorderView>
    </Container>
  );
};
