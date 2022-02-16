import React from 'react';

import { Container, Template, TemplateText } from './styles';

type BookImageProps = {
  type?: 'primary' | 'secondary';
  uri?: string;
};

export const BookImage: React.FC<BookImageProps> = ({
  type = 'primary',
  uri = '',
}) => {
  return uri ? (
    <Container source={{ uri }} type={type} />
  ) : (
    <Template type={type}>
      <TemplateText>Imagem indisponível</TemplateText>
    </Template>
  );
};
