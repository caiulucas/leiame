import React from 'react';
import { BookImage } from '@components/BookImage';
import { ProgressBar } from '@components/ProgressBar';
import { InfoText } from '@components/Texts/InfoText';
import { Title } from '@components/Texts/Title';
import { RFValue } from 'react-native-responsive-fontsize';
import { BookResponse } from '@hooks/books';
import { useNavigation } from '@react-navigation/native';
import { BookNavigationProps } from '@routes/types';
import { Button, Icon } from '../styles';
import {
  BookInfo,
  Container,
  ProgressArea,
  ProgressSpan,
  ProgressText,
} from './styles';

type BookDetailCardProps = {
  book: BookResponse;
};

export const BookDetailCard: React.FC<BookDetailCardProps> = ({ book }) => {
  const { navigate } = useNavigation<BookNavigationProps>();

  return (
    <Container
      onPress={() => navigate('book', { selfLink: book.selfLink, book })}
    >
      <BookImage uri={book.volumeInfo.imageLinks.large} />
      <BookInfo>
        <Title marginBottom={RFValue(8)} type="h3">
          {book.volumeInfo.title}
        </Title>
        <InfoText label="Por" type="secondary">
          {book.authors}
        </InfoText>
        <ProgressArea>
          <ProgressBar percentage={book.readingPercentage} />
          <ProgressText>
            <ProgressSpan>{book.actualPage || 0}</ProgressSpan> de{' '}
            <ProgressSpan>{book.volumeInfo.pageCount}</ProgressSpan>
          </ProgressText>
        </ProgressArea>
      </BookInfo>
      <Button>
        <Icon />
      </Button>
    </Container>
  );
};
