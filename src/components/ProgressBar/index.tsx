import React from 'react';
import { Container, Gradient } from './styles';

type ProgressBarProps = {
  percentage?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage = '0',
}) => {
  return (
    <Container>
      <Gradient percentage={percentage} />
    </Container>
  );
};
