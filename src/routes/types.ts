import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  book: { selfLink: string };
  tab: undefined;
};

export type BookNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'book'
>;
