import React from 'react';
import { AuthProvider } from './auth';
import { BooksProvider } from './books';

export const HooksProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <BooksProvider>{children}</BooksProvider>
    </AuthProvider>
  );
};
