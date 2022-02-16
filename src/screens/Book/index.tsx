import React, { useEffect, useState } from 'react';

import StarSvg from '@assets/star.svg';
import HalfStarSvg from '@assets/halfstar.svg';
import axios from 'axios';

import { Title } from '@components/Texts/Title';
import { InfoText } from '@components/Texts/InfoText';
import { TextButton } from '@components/Buttons/TextButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@components/Buttons/Button';
import { BookImage } from '@components/BookImage';
import {
  BookLeaflet,
  Book as MoreBooksResponse,
} from '@components/BookLeaflet';
import { FlatList } from 'react-native-gesture-handler';
import { BookNavigationProps } from '@routes/types';
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
  MoreBooksArea,
  StarGroup,
  SynopsisArea,
  TitleArea,
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
  const { goBack, push } = useNavigation<BookNavigationProps>();
  const { params } = useRoute();
  const { selfLink } = params as { selfLink: string };

  const [book, setBook] = useState<BookResponse>({} as BookResponse);
  const [moreBooks, setMoreBooks] = useState<MoreBooksResponse[]>([]);
  const [readMore, setReadMore] = useState(false);

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

      const { data: moreBooksData } = await axios.get(
        'https://www.googleapis.com/books/v1/volumes',
        { params: { q: `inauthor:${formattedBook.authors}` } },
      );

      setBook(formattedBook);
      setMoreBooks(moreBooksData.items);
    }

    fetchBook();
  }, [selfLink]);

  return (
    <Container>
      {book.id && (
        <>
          <Header>
            <BackButton icon="chevron-left" onPress={goBack} />
            <BookImage
              type="secondary"
              uri={book.volumeInfo.imageLinks.medium}
            />

            <StarGroup>
              <StarSvg />
              <StarSvg />
              <StarSvg />
              <StarSvg />
              <HalfStarSvg />
            </StarGroup>

            <BookTitle>{book.volumeInfo.title}</BookTitle>
            <Author>{book.authors}</Author>
          </Header>
          <Content>
            <Button title="Adicionar" />
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

          <MoreBooksArea>
            <TitleArea>
              <Title type="h2">Mais do autor</Title>
              <TextButton title="Ver mais" />
            </TitleArea>

            <FlatList
              data={moreBooks}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 24, paddingRight: 8 }}
              renderItem={({ item }) => (
                <BookLeaflet
                  book={item}
                  onPress={() =>
                    push('book', {
                      selfLink: item.selfLink,
                    })
                  }
                />
              )}
            />
          </MoreBooksArea>
        </>
      )}
    </Container>
  );
};
