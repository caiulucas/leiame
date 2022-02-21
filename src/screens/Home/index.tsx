import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@hooks/auth';

import { Bookshelf } from '@components/Bookshelf';
import { Header } from '@components/Header';

import { BookDetailCard } from '@components/Cards/BookDetailCard';
import { Book as BookshelfResponse } from '@components/BookLeaflet';
import { Title } from '@components/Texts/Title';
import { bookApi } from '@services/bookApi';
import { Separator } from '@components/Separator';
import { useFocusEffect } from '@react-navigation/native';
import { Container, Content } from './styles';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const [readingNow, setReadingNow] = useState<BookshelfResponse[]>([]);
  const [toRead, setToRead] = useState<BookshelfResponse[]>([]);
  const [haveRead, setHaveRead] = useState<BookshelfResponse[]>([]);

  const fetchLibraries = useCallback(async () => {
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
  }, [user.token]);

  useFocusEffect(() => {
    fetchLibraries();
  });

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title type="h1" marginBottom={8}>
            Última leitura
          </Title>
        </Content>
        <BookDetailCard />
        <Bookshelf title="Lendo" bookshelf={readingNow} />
        <Separator />
        <Bookshelf title="Vou ler" bookshelf={toRead} />
        <Separator />
        <Bookshelf title="Já li" bookshelf={haveRead} />
      </Container>
    </>
  );
};
