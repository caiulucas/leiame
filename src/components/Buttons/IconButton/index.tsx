import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon } from './styles';

type IconButtonProps = RectButtonProps & {
  icon: 'camera' | 'chevron-left' | 'log-out';
};

export const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon name={icon} />
    </Container>
  );
};
