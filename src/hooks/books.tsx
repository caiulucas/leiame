import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import { bookApi } from '@services/bookApi';
import axios from 'axios';
import { Alert } from 'react-native';
import { useAuth } from './auth';

type IndustryIdentifier = {
  type: string;
  identifier: string;
};

export type Status = 'reading-now' | 'to-read' | 'have-read' | undefined;

export type BookResponse = {
  id: string;
  authors: string;
  selfLink: string;
  isbn: IndustryIdentifier;
  status: Status;
  actualPage: number | undefined;
  readingPercentage: string;
  volumeInfo: {
    title: string;
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    imageLinks: {
      large: string;
    };
  };
};

type BooksContext = {
  lastReadBook: BookResponse | undefined;
  bookshelvesRefreshList: number[];
  fetchBook: (selfLink: string) => Promise<BookResponse | void>;
  addToBookshelf: (book: BookResponse, status: Status) => Promise<void>;
  updateActualPage: (book: BookResponse, actualPage: number) => Promise<void>;
};

const BooksContext = createContext<BooksContext>({} as BooksContext);
const storageKey = '@leiame:lastReadBook';
const bookshelves = {
  'reading-now': 3,
  'to-read': 2,
  'have-read': 4,
};
const bookshelvesList: { status: Status; id: number }[] = [
  { status: 'reading-now', id: 3 },
  { status: 'to-read', id: 2 },
  { status: 'have-read', id: 4 },
];

export const BooksProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [lastReadBook, setLastReadBook] = useState<BookResponse | undefined>();
  const [bookshelvesRefreshList, setBookshelvesRefreshList] = useState<
    number[]
  >([]);

  useEffect(() => {
    async function loadLastReadBook() {
      const asyncLastReadBook = await AsyncStorage.getItem(storageKey);

      if (asyncLastReadBook) setLastReadBook(JSON.parse(asyncLastReadBook));
    }

    loadLastReadBook();
  }, []);

  const fetchBook = useCallback(
    async (selfLink: string) => {
      const { data } = await axios.get(selfLink);

      const formattedBook: BookResponse = {
        ...data,
        authors: data.volumeInfo.authors.join(' ,'),
        isbn: data.volumeInfo.industryIdentifiers.filter(
          (industryIdentifier: IndustryIdentifier) =>
            industryIdentifier.type === 'ISBN_13',
        )[0],
      };

      try {
        const firestoreBookResponse = await firestore()
          .collection('books')
          .where('userEmail', '==', user.email)
          .where('bookId', '==', formattedBook.id)
          .where('status', '==', 'reading-now')
          .get();

        const firestoreBook = firestoreBookResponse.docs[0]?.data();

        // Check if book exists on reading-now bookshelf and returns
        if (firestoreBook) {
          formattedBook.status = firestoreBook.status;
          formattedBook.actualPage = firestoreBook.actualPage;
          formattedBook.readingPercentage = String(
            (firestoreBook.actualPage / formattedBook.volumeInfo.pageCount) *
              100,
          );
          return formattedBook;
        }

        // Get bookshelf from book and save in firebase if book is on reading-now
        const bookshelvesPromises = bookshelvesList.map(async bookshelf => {
          const { data: bookshelfResponse } = await bookApi.get(
            `/mylibrary/bookshelves/${bookshelf.id}/volumes?q=isbn:${formattedBook.isbn.identifier}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            },
          );

          if (
            bookshelfResponse.totalItems > 0 &&
            bookshelfResponse.items[0]?.id === formattedBook.id
          ) {
            formattedBook.status = bookshelf.status;

            if (bookshelf.status === 'reading-now') {
              firestore().collection('books').add({
                userEmail: user.email,
                bookId: formattedBook.id,
                actualPage: 0,
                status: 'reading-now',
              });
            }

            return false;
          }
          return true;
        });

        await Promise.all(bookshelvesPromises);

        return formattedBook;
      } catch (error) {
        return Alert.alert('Erro de autenticação');
      }
    },
    [user.email, user.token],
  );

  const addToBookshelf = useCallback(
    async (book: BookResponse, status: Status) => {
      if (book.status === status) return;

      if (book.status) {
        const oldBookshelfId = bookshelves[book.status];

        setBookshelvesRefreshList(value => [...value, oldBookshelfId]);
        await bookApi.post(
          `/mylibrary/bookshelves/${oldBookshelfId}/removeVolume?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
              'Content-Length': 'CONTENT_LENGTH',
            },
          },
        );
      }

      if (status) {
        const newBookshelfId = bookshelves[status];
        setBookshelvesRefreshList(value => [...value, newBookshelfId]);

        await bookApi.post(
          `/mylibrary/bookshelves/${newBookshelfId}/addVolume?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
              'Content-Length': 'CONTENT_LENGTH',
            },
          },
        );
      }
    },
    [user.token],
  );

  const updateActualPage = useCallback(
    async (book: BookResponse, actualPage: number) => {
      if (actualPage > book.volumeInfo.pageCount || actualPage < 0)
        return Alert.alert(
          'Página inválida',
          'A página não existe no livro em questão.',
        );

      const newBook = {
        ...book,
        actualPage,
        readingPercentage: String(
          (actualPage / book.volumeInfo.pageCount) * 100,
        ),
      };

      setLastReadBook(newBook);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newBook));
      try {
        const firestoreBookResponse = await firestore()
          .collection('books')
          .where('userEmail', '==', user.email)
          .where('bookId', '==', book.id)
          .get();

        const firestoreBookDoc = firestoreBookResponse.docs[0];

        return firestore()
          .collection('books')
          .doc(firestoreBookDoc.id)
          .update({ actualPage });
      } catch (error) {
        return console.error(error);
      }
    },
    [user.email],
  );

  const value = useMemo(
    () => ({
      bookshelvesRefreshList,
      updateActualPage,
      lastReadBook,
      fetchBook,
      addToBookshelf,
    }),
    [
      updateActualPage,
      bookshelvesRefreshList,
      lastReadBook,
      fetchBook,
      addToBookshelf,
    ],
  );

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};
