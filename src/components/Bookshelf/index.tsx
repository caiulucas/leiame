import React, { useEffect, useState } from 'react';

import { TextButton } from '@components/Buttons/TextButton';
import { Title } from '@components/Texts/Title';
import { FlatList } from 'react-native';

import { BookLeaflet, Book } from '@components/BookLeaflet';
import { useNavigation } from '@react-navigation/native';
import { BookNavigationProps } from '@routes/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { bookApi } from '@services/bookApi';
import { useAuth } from '@hooks/auth';
import { useBooks } from '@hooks/books';
import { AddBookCard, Container, Icon, TitleArea } from './styles';
import { SkeletonBookshelf } from './skeleton';

type BookshelfProps = {
  title: string;
  path: string;
};

export const Bookshelf: React.FC<BookshelfProps> = ({ title, path }) => {
  const { push, navigate } = useNavigation<BookNavigationProps>();
  const { user } = useAuth();
  const { bookshelvesRefreshList } = useBooks();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookshelves() {
      const { data } = await bookApi.get(path, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setBooks(data.items);
      setLoading(false);
    }

    fetchBookshelves();
  }, [path, user.token, bookshelvesRefreshList]);
  return (
    <Container>
      {loading ? (
        <SkeletonBookshelf />
      ) : (
        <>
          <TitleArea>
            <Title type="h2">{title}</Title>
            <TextButton title="Ver mais" />
          </TitleArea>

          {books.length > 0 ? (
            <FlatList
              data={books}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: RFValue(24),
                paddingRight: RFValue(8),
              }}
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
          ) : (
            <AddBookCard onPress={() => navigate('search')}>
              <Icon />
            </AddBookCard>
          )}
        </>
      )}
    </Container>
  );
};
