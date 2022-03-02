import React from 'react';

import { Bookshelf } from '@components/Bookshelf';
import { Header } from '@components/Header';

import { BookDetailCard } from '@components/Cards/BookDetailCard';
import { Title } from '@components/Texts/Title';
import { Separator } from '@components/Separator';
import { useBooks } from '@hooks/books';
import { View } from 'react-native';
import { Container, Content } from './styles';

const bookshelvesTitles = ['Lendo', 'Vou ler', 'Já li'];

export const Home: React.FC = () => {
  const { lastReadBook } = useBooks();

  return (
    <>
      <Header />
      <Container showsVerticalScrollIndicator={false}>
        {lastReadBook && (
          <Content>
            <Title type="h1" marginBottom={8}>
              Última leitura
            </Title>

            <BookDetailCard book={lastReadBook} />
          </Content>
        )}

        {[3, 2, 4].map((bookshelfId, index) => (
          <View key={bookshelfId}>
            <Bookshelf
              title={bookshelvesTitles[index]}
              path={`/mylibrary/bookshelves/${bookshelfId}/volumes`}
            />
            <Separator key={bookshelfId} />
          </View>
        ))}
      </Container>
    </>
  );
};
