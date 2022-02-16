import React from 'react';
import { useAuth } from '@hooks/auth';

import { IconButton } from '@components/Buttons/IconButton';
import {
  Avatar,
  AvatarTemplate,
  Container,
  Greetings,
  UserArea,
  UserIcon,
} from './styles';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <UserArea>
        {user.avatar ? (
          <Avatar source={{ uri: user.avatar }} />
        ) : (
          <AvatarTemplate>
            <UserIcon />
          </AvatarTemplate>
        )}
        <Greetings>Olá, {user.name}</Greetings>
      </UserArea>
      <IconButton icon="camera" />
    </Container>
  );
};
