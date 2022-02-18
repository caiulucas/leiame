import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Title } from '@components/Texts/Title';
import { InfoText } from '@components/Texts/InfoText';
import { TextButton } from '@components/Buttons/TextButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@components/Buttons/Button';
import { BookImage } from '@components/BookImage';
import { Book as BookshelfResponse } from '@components/BookLeaflet';
import { BottomSheet } from '@components/BottomSheet';
import { bookApi } from '@services/bookApi';
import { Bookshelf } from '@components/Bookshelf';
import {
  Author,
  BackButton,
  BookTitle,
  ButtonArea,
  Container,
  Content,
  Description,
  Header,
  InfoArea,
  ScrollContent,
  SynopsisArea,
} from './styles';

type IndustryIdentifier = {
  type: string;
  identifier: string;
};

type BookResponse = {
  id: string;
  authors: string;
  isbn: IndustryIdentifier;
  volumeInfo: {
    title: string;
    publisher: string;
    publishedDate: string;
    description: string;
    printedPageCount: number;
    imageLinks: {
      medium: string;
    };
  };
};

export const Book: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { selfLink } = params as { selfLink: string };

  const [book, setBook] = useState<BookResponse>({} as BookResponse);
  const [authorBookshelf, setAuthorBookshelf] = useState<BookshelfResponse[]>(
    [],
  );
  const [readMore, setReadMore] = useState(false);
  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      const { data } = await axios.get(selfLink);

      const formattedBook = {
        ...data,
        authors: data.volumeInfo.authors.join(' ,'),
        isbn: data.volumeInfo.industryIdentifiers.filter(
          (industryIdentifier: IndustryIdentifier) =>
            industryIdentifier.type === 'ISBN_13',
        )[0],
      };

      const { data: moreBooksData } = await bookApi.get('/volumes', {
        params: { q: `inauthor:${formattedBook.authors}` },
      });

      setBook(formattedBook);
      setAuthorBookshelf(moreBooksData.items);
    }

    fetchBook();
  }, [selfLink]);

  return (
    <Container>
      {book.id && (
        <ScrollContent>
          <Header>
            <BackButton icon="chevron-left" onPress={goBack} />
            <BookImage
              type="secondary"
              uri={book.volumeInfo.imageLinks?.medium}
            />

            <BookTitle>{book.volumeInfo.title}</BookTitle>
            <Author>{book.authors}</Author>
          </Header>
          <Content>
            <Button
              title="Adicionar"
              onPress={() => setBottomSheetIsVisible(true)}
            />
            <SynopsisArea>
              <Title type="h2">Sinopse</Title>
              <Description numberOfLines={readMore ? 0 : 5}>
                {book.volumeInfo.description}
              </Description>
              <ButtonArea>
                <TextButton
                  title={readMore ? 'Ler menos' : 'Ler mais'}
                  onPress={() => setReadMore(value => !value)}
                />
              </ButtonArea>
            </SynopsisArea>
            <InfoArea>
              <InfoText label="Editora">{book.volumeInfo.publisher}</InfoText>
              <InfoText label="N de páginas">
                {book.volumeInfo.printedPageCount}
              </InfoText>
              <InfoText label="Data de lançamento">
                {book.volumeInfo.publishedDate}
              </InfoText>
              <InfoText label="ISBN">{book.isbn?.identifier}</InfoText>
            </InfoArea>
          </Content>

          <Bookshelf title="Mais do autor" bookshelf={authorBookshelf} />
        </ScrollContent>
      )}
      {bottomSheetIsVisible && (
        <BottomSheet setIsVisible={setBottomSheetIsVisible} />
      )}
    </Container>
  );
};
