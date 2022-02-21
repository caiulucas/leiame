import React from 'react';
import { BookImage } from '@components/BookImage';
import { ProgressBar } from '@components/ProgressBar';
import { InfoText } from '@components/Texts/InfoText';
import { Title } from '@components/Texts/Title';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, Icon } from '../styles';
import {
  BookInfo,
  Container,
  ProgressArea,
  ProgressSpan,
  ProgressText,
} from './styles';

export const BookDetailCard: React.FC = () => {
  return (
    <Container>
      <BookImage />
      <BookInfo>
        <Title marginBottom={RFValue(8)} type="h3">
          O Senhor dos Anéis: A Sociedade do Anel
        </Title>
        <InfoText label="Por" type="secondary">
          J. R. R. Tolkien
        </InfoText>
        <ProgressArea>
          <ProgressBar percentage="42" />
          <ProgressText>
            <ProgressSpan>288</ProgressSpan> de <ProgressSpan>576</ProgressSpan>
          </ProgressText>
        </ProgressArea>
      </BookInfo>
      <Button>
        <Icon />
      </Button>
    </Container>
  );
};
