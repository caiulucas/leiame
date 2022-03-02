import React, { useCallback, useEffect, useState } from 'react';
import { BookCard, Book as BookResponse } from '@components/Cards/BookCard';
import { SearchInput } from '@components/SearchInput';

import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookNavigationProps } from '@routes/types';
import { IconButton } from '@components/Buttons/IconButton';
import { bookApi } from '@services/bookApi';
import { useAuth } from '@hooks/auth';
import { Title } from '@components/Texts/Title';
import { Container, Content, Header, InputArea, TitleArea } from './styles';
import { SkeletonSearch } from './skeleton';

type SearchParams = {
  q?: string;
  startIndex: number;
};

export const BookshelfSearch: React.FC = () => {
  const { user } = useAuth();
  const { navigate, goBack } = useNavigation<BookNavigationProps>();
  const { params } = useRoute();
  const { path } = params as { path: string };

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
      const searchParams: SearchParams = { startIndex: actualPage * 10 };

      if (searchText) searchParams.q = searchText;
      const { data } = await bookApi.get(path, {
        params: searchParams,
        headers: { Authorization: `Bearer ${user.token}` },
      });
      books.forEach(book => console.log(book.volumeInfo.title));
      if (data.items) setBooks(value => [...value, ...data.items]);
      setLoading(false);
    },
    [books, path, searchText, user.token],
  );

  const handleAddPage = useCallback(() => {
    handleSearch(page + 1);
    setPage(page + 1);
  }, [handleSearch, page]);

  useEffect(() => {
    handleSearch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header>
        <TitleArea>
          <IconButton icon="chevron-left" type="secondary" onPress={goBack} />
          <Title type="h1" marginLeft={8}>
            Última leitura
          </Title>
        </TitleArea>
        <InputArea>
          <SearchInput
            marginRight={0}
            value={searchText}
            onChangeText={setSearchText}
            onPress={() => {
              handleSearch(0);
              setPage(0);
              setBooks([]);
            }}
          />
        </InputArea>
      </Header>

      <Content>
        {loading && searchText && page === 0 ? (
          <SkeletonSearch />
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item.etag}
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
