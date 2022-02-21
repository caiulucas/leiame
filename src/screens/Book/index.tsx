import React, { useEffect, useState } from 'react';

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
import { useBooks, BookResponse } from '@hooks/books';
import { ProgressBar } from '@components/ProgressBar';

import { PageSheet } from '@components/PageSheet';
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
  PercentageArea,
  PercentageSpan,
  PercentageText,
  ScrollContent,
  SynopsisArea,
} from './styles';

const status = {
  'reading-now': 'Lendo',
  'to-read': 'Vou ler',
  'have-read': 'Já li',
};

export const Book: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { fetchBook } = useBooks();

  const { selfLink } = params as { selfLink: string };

  const [book, setBook] = useState<BookResponse>({} as BookResponse);
  const [authorBookshelf, setAuthorBookshelf] = useState<BookshelfResponse[]>(
    [],
  );
  const [readMore, setReadMore] = useState(false);
  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState(false);
  const [pageSheetIsVisible, setPageSheetIsVisible] = useState(false);

  useEffect(() => {
    async function loadBook() {
      const fetchedBook = await fetchBook(selfLink);

      if (fetchedBook) {
        setBook(fetchedBook);

        const { data: moreBooksData } = await bookApi.get('/volumes', {
          params: { q: `inauthor:${fetchedBook.authors}` },
        });

        setAuthorBookshelf(moreBooksData.items);
      }
    }

    loadBook();
  }, [fetchBook, selfLink]);

  return (
    <Container>
      {book.id && (
        <ScrollContent showsVerticalScrollIndicator={false}>
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
            {book.status === 'reading-now' && (
              <>
                <PercentageArea>
                  <ProgressBar percentage={book.readingPercentage} />
                  <PercentageText>
                    <PercentageSpan>{book.actualPage || 0}</PercentageSpan> de{' '}
                    <PercentageSpan>
                      {book.volumeInfo.printedPageCount}
                    </PercentageSpan>{' '}
                    páginas lidas
                  </PercentageText>
                </PercentageArea>
                <Button
                  hasIcon={false}
                  marginBottom={16}
                  outline
                  title="Atualizar Leitura"
                  onPress={() => setPageSheetIsVisible(true)}
                />
              </>
            )}
            <Button
              title={book.status ? status[book.status] : 'Adicionar'}
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
        <BottomSheet
          book={book}
          option={book.status}
          setBook={setBook}
          setIsVisible={setBottomSheetIsVisible}
        />
      )}
      {pageSheetIsVisible && (
        <PageSheet
          book={book}
          setBook={setBook}
          setIsVisible={setPageSheetIsVisible}
        />
      )}
    </Container>
  );
};
