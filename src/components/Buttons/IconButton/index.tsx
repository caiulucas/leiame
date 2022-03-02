import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon } from './styles';

type IconButtonProps = RectButtonProps & {
  icon: 'camera' | 'chevron-left' | 'log-out';
  type?: 'primary' | 'secondary';
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  type = 'primary',
  ...rest
}) => {
  return (
    <Container type={type} {...rest}>
      <Icon name={icon} />
    </Container>
  );
};
