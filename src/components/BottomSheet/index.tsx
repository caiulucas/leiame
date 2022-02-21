import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { BookResponse, Status, useBooks } from '@hooks/books';
import { Container, Option, OptionText } from './styles';

type BottomSheetProps = {
  setIsVisible: (isVisible: boolean) => void;
  setBook: React.Dispatch<React.SetStateAction<BookResponse>>;
  book: BookResponse;
  option?: Status;
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  setIsVisible,
  setBook,
  book,
  option,
}) => {
  const { addToBookshelf } = useBooks();

  const sheetRef = useRef<BottomSheetModal>(null);

  const [selected, setSelected] = useState(option);

  const handleSelect = useCallback(
    async (selectedOption: Status) => {
      setSelected(selectedOption);
      setBook(value => ({ ...value, status: selectedOption }));
      sheetRef.current?.dismiss();
      await addToBookshelf(book, selectedOption);
    },
    [addToBookshelf, book, setBook],
  );

  useEffect(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <Container onPressOut={() => sheetRef.current?.dismiss()}>
        <BottomSheetModal
          ref={sheetRef}
          index={0}
          snapPoints={['33%']}
          onDismiss={() => setIsVisible(false)}
        >
          <Option
            selected={selected === 'reading-now'}
            onPress={() => handleSelect('reading-now')}
          >
            <OptionText selected={selected === 'reading-now'}>Lendo</OptionText>
          </Option>
          <Option
            selected={selected === 'to-read'}
            onPress={() => handleSelect('to-read')}
          >
            <OptionText selected={selected === 'to-read'}>Vou ler</OptionText>
          </Option>
          <Option
            selected={selected === 'have-read'}
            onPress={() => handleSelect('have-read')}
          >
            <OptionText selected={selected === 'have-read'}>Já li</OptionText>
          </Option>
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
};
