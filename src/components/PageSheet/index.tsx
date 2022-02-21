import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@components/Buttons/Button';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BookResponse, useBooks } from '@hooks/books';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Input, Span, Title } from './styles';

type PageSheetProps = {
  setIsVisible: (isVisible: boolean) => void;
  setBook: React.Dispatch<React.SetStateAction<BookResponse>>;
  book: BookResponse;
};

export const PageSheet: React.FC<PageSheetProps> = ({
  setIsVisible,
  setBook,
  book,
}) => {
  const { updateActualPage } = useBooks();

  const sheetRef = useRef<BottomSheetModal>(null);
  const inputRef = useRef<TextInput>(null);

  const [page, setPage] = useState(
    book.actualPage ? String(book.actualPage) : '',
  );

  const handleSubmit = useCallback(async () => {
    const numberPage = Number(Number(page.replace(',', '.')).toFixed(0));
    const newPercentage = String(
      (numberPage / book.volumeInfo.printedPageCount) * 100,
    );

    setBook(value => ({
      ...value,
      actualPage: numberPage,
      readingPercentage: newPercentage,
    }));
    sheetRef.current?.dismiss();
    await updateActualPage(book, numberPage);
  }, [book, page, setBook, updateActualPage]);

  useEffect(() => {
    sheetRef.current?.present();
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  return (
    <BottomSheetModalProvider>
      <Container onPressOut={() => sheetRef.current?.dismiss()}>
        <BottomSheetModal
          ref={sheetRef}
          index={0}
          snapPoints={['50%']}
          style={{ paddingHorizontal: RFValue(24) }}
          onDismiss={() => setIsVisible(false)}
        >
          <Title>
            <Span>{book.actualPage || 0}</Span> de{' '}
            <Span>{book.volumeInfo.printedPageCount}</Span> páginas lidas
          </Title>
          <Input
            ref={inputRef}
            value={page}
            placeholder="Digite a última página lida"
            keyboardType="decimal-pad"
            onChangeText={setPage}
            onEndEditing={handleSubmit}
          />
          <Button
            title="Atualizar páginas"
            hasIcon={false}
            onPress={handleSubmit}
          />
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
};
