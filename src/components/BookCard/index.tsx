import React from 'react';
import { Title } from '@components/Texts/Title';

import { InfoText } from '@components/Texts/InfoText';
import { TouchableOpacityProps } from 'react-native';
import {
  BookImage,
  BookInfo,
  BookTemplate,
  BookTemplateText,
  Button,
  Container,
  Icon,
} from './styles';

export type Book = {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    imageLinks: {
      smallThumbnail: string | undefined;
      thumbnail: string | undefined;
    };
  };
};

type BookCardProps = TouchableOpacityProps & {
  book: Book;
};

export const BookCard: React.FC<BookCardProps> = ({ book, ...rest }) => {
  return (
    <Container {...rest}>
      {book.volumeInfo.imageLinks?.thumbnail ? (
        <BookImage
          source={{
            uri: book.volumeInfo.imageLinks.thumbnail,
          }}
        />
      ) : (
        <BookTemplate>
          <BookTemplateText>Imagem indisponível</BookTemplateText>
        </BookTemplate>
      )}
      <BookInfo>
        <Title marginBottom={16} type="h3">
          {book.volumeInfo.title}
        </Title>
        <InfoText label="Por">{book.volumeInfo.authors.join(', ')}</InfoText>
        <InfoText last label="Editora">
          {book.volumeInfo.publisher}
        </InfoText>
        <Button>
          <Icon />
        </Button>
      </BookInfo>
    </Container>
  );
};
