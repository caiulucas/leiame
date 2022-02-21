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
  isbn: IndustryIdentifier;
  status: Status;
  actualPage: number | undefined;
  readingPercentage: string;
  volumeInfo: {
    title: string;
    publisher: string;
    publishedDate: string;
    description: string;
    printedPageCount: number;
    imageLinks: {
      medium: string;
    };
  };
};

type BooksContext = {
  lastReadBook: BookResponse | undefined;
  fetchBook: (selfLink: string) => Promise<BookResponse | void>;
  addToBookshelf: (book: BookResponse, status: Status) => Promise<void>;
  updateActualPage: (book: BookResponse, actualPage: number) => Promise<void>;
};

const BooksContext = createContext<BooksContext>({} as BooksContext);

const storageKey = '@leiame:lastReadBook';

const bookshelves: { status: Status; id: number }[] = [
  { status: 'reading-now', id: 3 },
  { status: 'to-read', id: 2 },
  { status: 'have-read', id: 4 },
];

export const BooksProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [lastReadBook, setLastReadBook] = useState<BookResponse | undefined>();

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
        console.log(firestoreBook);
        if (firestoreBook) {
          formattedBook.actualPage = firestoreBook.actualPage;
          formattedBook.readingPercentage = (
            (firestoreBook.actualPage /
              formattedBook.volumeInfo.printedPageCount) *
            100
          ).toFixed(0);
        }

        bookshelves.every(async bookshelf => {
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
            if (
              formattedBook.status !== 'reading-now' &&
              bookshelf.status === 'reading-now'
            ) {
              formattedBook.status = bookshelf.status;
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

      const oldBookshelf = bookshelves.find(
        bookshelf => bookshelf.status === book.status,
      );
      if (oldBookshelf)
        await bookApi.post(
          `/mylibrary/bookshelves/${oldBookshelf.id}/removeVolume?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
              'Content-Length': 'CONTENT_LENGTH',
            },
          },
        );

      const newBookshelf = bookshelves.find(
        bookshelf => bookshelf.status === status,
      );

      if (newBookshelf)
        await bookApi.post(
          `/mylibrary/bookshelves/${newBookshelf.id}/addVolume?volumeId=${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
              'Content-Length': 'CONTENT_LENGTH',
            },
          },
        );
    },
    [user.token],
  );

  const updateActualPage = useCallback(
    async (book: BookResponse, actualPage: number) => {
      if (actualPage > book.volumeInfo.printedPageCount || actualPage < 0)
        return Alert.alert(
          'Página inválida',
          'A página não existe no livro em questão.',
        );

      setLastReadBook({
        ...book,
        actualPage,
        readingPercentage: String(
          (actualPage / book.volumeInfo.printedPageCount) * 100,
        ),
      });
      await AsyncStorage.setItem(storageKey, JSON.stringify(book));
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
    () => ({ updateActualPage, lastReadBook, fetchBook, addToBookshelf }),
    [updateActualPage, lastReadBook, fetchBook, addToBookshelf],
  );

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};
