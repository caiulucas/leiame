import React, { useCallback, useState } from 'react';
import { BookCard, Book as BookResponse } from '@components/Cards/BookCard';
import { SearchInput } from '@components/SearchInput';

import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookNavigationProps } from '@routes/types';
import { IconButton } from '@components/Buttons/IconButton';
import { bookApi } from '@services/bookApi';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Content, Header } from './styles';

export const Search: React.FC = () => {
  const { navigate } = useNavigation<BookNavigationProps>();

  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState<BookResponse[]>([]);

  const handleNavigate = useCallback(
    (selfLink: string) => {
      navigate('book', { selfLink });
    },
    [navigate],
  );

  const handleSearch = useCallback(async () => {
    const response = await bookApi.get('/volumes', {
      params: { q: searchText },
    });
    setBooks(response.data.items);
  }, [searchText]);

  return (
    <Container>
      <Header>
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          onPress={handleSearch}
        />

        <IconButton icon="camera" />
      </Header>

      <Content>
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: RFValue(24) }}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={() => handleNavigate(item.selfLink)}
            />
          )}
        />
      </Content>
    </Container>
  );
};
