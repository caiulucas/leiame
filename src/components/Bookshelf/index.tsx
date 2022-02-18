import React from 'react';

import { TextButton } from '@components/Buttons/TextButton';
import { Title } from '@components/Texts/Title';
import { FlatList } from 'react-native';

import { BookLeaflet, Book } from '@components/BookLeaflet';
import { useNavigation } from '@react-navigation/native';
import { BookNavigationProps } from '@routes/types';
import { Container, TitleArea } from './styles';

type BookshelfProps = {
  title: string;
  bookshelf: Book[];
};

export const Bookshelf: React.FC<BookshelfProps> = ({ title, bookshelf }) => {
  const { push } = useNavigation<BookNavigationProps>();

  return (
    <Container>
      <TitleArea>
        <Title type="h2">{title}</Title>
        <TextButton title="Ver mais" />
      </TitleArea>

      <FlatList
        data={bookshelf}
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
    </Container>
  );
};
