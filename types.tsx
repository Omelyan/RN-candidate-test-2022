import { NativeStackScreenProps } from '@react-navigation/native-stack';

import * as Screens from '~/screens';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type Routes = keyof typeof Screens;

type RouteParams<T extends { [name in Routes]: unknown }> = T;

export type RootStackParamList = RouteParams<{
  Profile: undefined;
  SignIn: undefined;
  SignUp: undefined;
}>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
