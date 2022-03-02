import React from 'react';

import { Container, Icon, Input, SearchButton } from './styles';

type SearchInputProps = {
  value: string;
  marginRight?: number;
  onChangeText: (text: string) => void;
  onPress: () => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  onPress,
  value,
  marginRight = 8,
  onChangeText,
}) => {
  return (
    <Container marginRight={marginRight}>
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
