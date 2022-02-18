import React, { useEffect, useState } from 'react';
import { useAuth } from '@hooks/auth';

import { Bookshelf } from '@components/Bookshelf';
import { Header } from '@components/Header';

import { BookDetailCard } from '@components/Cards/BookDetailCard';
import { Book as BookshelfResponse } from '@components/BookLeaflet';
import { Title } from '@components/Texts/Title';
import { bookApi } from '@services/bookApi';
import { Container, Content } from './styles';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const [readingNow, setReadingNow] = useState<BookshelfResponse[]>([]);
  const [toRead, setToRead] = useState<BookshelfResponse[]>([]);
  const [haveRead, setHaveRead] = useState<BookshelfResponse[]>([]);

  useEffect(() => {
    async function fetchLibraries() {
      const { data: readingNowResponse } = await bookApi.get(
        `/mylibrary/bookshelves/3/volumes`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      const { data: toReadResponse } = await bookApi.get(
        `/mylibrary/bookshelves/2/volumes`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      const { data: haveReadResponse } = await bookApi.get(
        `/mylibrary/bookshelves/4/volumes`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      setReadingNow(readingNowResponse.items);
      setToRead(toReadResponse.items);
      setHaveRead(haveReadResponse.items);
    }

    fetchLibraries();
  }, [user.token]);

  return (
    <Container>
      <Header />
      <Content>
        <Title type="h1" marginBottom={8}>
          Última leitura
        </Title>
      </Content>
      <BookDetailCard />
      <Bookshelf title="Lendo" bookshelf={readingNow} />
      <Bookshelf title="Vou ler" bookshelf={toRead} />
      <Bookshelf title="Já li" bookshelf={haveRead} />
    </Container>
  );
};
