import { BookResponse } from '@hooks/books';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  book: { selfLink: string; book?: BookResponse };
  tab: undefined;
  search: undefined;
  bookshelfSearch: { path: string };
};

export type BookNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'book'
>;
