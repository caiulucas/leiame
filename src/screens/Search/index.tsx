import { Header } from '@components/Header';
import { SearchInput } from '@components/SearchInput';
import React, { useState } from 'react';

import { Container, Content } from './styles';

export const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Container>
      <Header />

      <Content>
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          onPress={() => console.log(searchText)}
        />
      </Content>
    </Container>
  );
};
