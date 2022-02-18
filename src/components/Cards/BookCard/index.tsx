import React from 'react';
import { Title } from '@components/Texts/Title';

import { InfoText } from '@components/Texts/InfoText';
import { TouchableOpacityProps } from 'react-native';
import { BookImage } from '@components/BookImage';
import { Container } from './styles';
import { BookInfo, Button, Icon } from '../styles';

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
      <BookImage uri={book.volumeInfo.imageLinks?.thumbnail} />
      <BookInfo>
        <Title marginBottom={16} type="h3">
          {book.volumeInfo.title}
        </Title>
        <InfoText label="Por" type="secondary">
          {book.volumeInfo.authors.join(', ')}
        </InfoText>
        <InfoText last type="secondary" label="Editora">
          {book.volumeInfo.publisher}
        </InfoText>
        <Button>
          <Icon />
        </Button>
      </BookInfo>
    </Container>
  );
};
