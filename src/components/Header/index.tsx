import React from 'react';
import { IconButton } from '@components/Buttons/IconButton';
import { useAuth } from '@hooks/auth';
import {
  Avatar,
  AvatarTemplate,
  Container,
  Greetings,
  UserArea,
  UserIcon,
} from './styles';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

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
      <IconButton icon="log-out" onPress={signOut} />
    </Container>
  );
};
