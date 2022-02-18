import React, { useEffect, useRef, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { Container, Option, OptionText } from './styles';

type BottomSheetProps = {
  setIsVisible: (isVisible: boolean) => void;
  option?: 'reading' | 'to-read' | 'have-read';
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  setIsVisible,
  option,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);

  const [selected, setSelected] = useState(option);

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
            selected={selected === 'reading'}
            onPress={() => setSelected('reading')}
          >
            <OptionText selected={selected === 'reading'}>Lendo</OptionText>
          </Option>
          <Option
            selected={selected === 'to-read'}
            onPress={() => setSelected('to-read')}
          >
            <OptionText selected={selected === 'to-read'}>Vou ler</OptionText>
          </Option>
          <Option
            selected={selected === 'have-read'}
            onPress={() => setSelected('have-read')}
          >
            <OptionText selected={selected === 'have-read'}>Já li</OptionText>
          </Option>
        </BottomSheetModal>
      </Container>
    </BottomSheetModalProvider>
  );
};
