import { useAuth } from '@hooks/auth';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Icon, Title } from './styles';

type SignInButtonProps = RectButtonProps & {
  title: string;
};

export const SignInButton: React.FC<SignInButtonProps> = ({
  title,
  ...rest
}) => {
  const { signIn } = useAuth();
  return (
    <Container {...rest} onPress={signIn}>
      <Icon name="google" size={RFValue(24)} color="black" />
      <Title>{title}</Title>
    </Container>
  );
};
