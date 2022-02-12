import React from 'react';

import { Container, Icon, Input, SearchButton } from './styles';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  onPress,
  value,
  onChangeText,
}) => {
  return (
    <Container>
      <Input
        placeholder="Procure um livro"
        value={value}
        onChangeText={onChangeText}
        onEndEditing={() => onPress()}
      />
      <SearchButton onPress={onPress}>
        <Icon />
      </SearchButton>
    </Container>
  );
};
