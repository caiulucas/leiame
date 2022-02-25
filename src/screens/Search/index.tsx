import React, { useCallback, useState } from 'react';
import { BookCard, Book as BookResponse } from '@components/Cards/BookCard';
import { SearchInput } from '@components/SearchInput';

import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookNavigationProps } from '@routes/types';
import { IconButton } from '@components/Buttons/IconButton';
import { bookApi } from '@services/bookApi';
import { Container, Content, Header } from './styles';
import { SkeletonSearch } from './skeleton';

export const Search: React.FC = () => {
  const { navigate } = useNavigation<BookNavigationProps>();

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleNavigate = useCallback(
    (selfLink: string) => {
      navigate('book', { selfLink });
    },
    [navigate],
  );

  const handleSearch = useCallback(
    async (actualPage: number) => {
      setLoading(true);
      const { data } = await bookApi.get('/volumes', {
        params: { q: searchText, startIndex: actualPage * 10 },
      });
      setBooks(value => [...value, ...data.items]);
      setLoading(false);
    },
    [searchText],
  );

  const handleAddPage = useCallback(() => {
    handleSearch(page + 1);
    setPage(page + 1);
  }, [handleSearch, page]);

  return (
    <Container>
      <Header>
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          onPress={() => {
            handleSearch(0);
            setPage(0);
            setBooks([]);
          }}
        />

        <IconButton icon="camera" />
      </Header>

      <Content>
        {loading && searchText && page === 0 ? (
          <SkeletonSearch />
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item.id}
            onEndReachedThreshold={10}
            onEndReached={handleAddPage}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={() => handleNavigate(item.selfLink)}
              />
            )}
          />
        )}
      </Content>
    </Container>
  );
};
