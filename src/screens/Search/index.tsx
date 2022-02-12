import React, { useCallback, useState } from 'react';
import { BookCard, Book as BookResponse } from '@components/BookCard';
import { Header } from '@components/Header';
import { SearchInput } from '@components/SearchInput';

import axios from 'axios';

import { FlatList } from 'react-native';
import { Container, Content } from './styles';

export const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<BookResponse[]>([]);

  const handleSearch = useCallback(async () => {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes',
      { params: { q: searchText } },
    );
    setBooks(response.data.items);
  }, [searchText]);

  return (
    <Container>
      <Header />

      <Content>
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          onPress={handleSearch}
        />
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24 }}
          renderItem={({ item }) => <BookCard book={item} />}
        />
      </Content>
    </Container>
  );
};
