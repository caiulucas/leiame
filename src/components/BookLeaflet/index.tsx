import { BookImage } from '@components/BookImage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

export type Book = {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
};

type BookLeafletProps = TouchableOpacityProps & {
  book: Book;
};

export const BookLeaflet: React.FC<BookLeafletProps> = ({ book, ...rest }) => {
  return (
    <Container {...rest}>
      <BookImage uri={book.volumeInfo.imageLinks.thumbnail} />
      <Title numberOfLines={2}>{book.volumeInfo.title}</Title>
    </Container>
  );
};
