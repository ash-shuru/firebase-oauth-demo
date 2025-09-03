export enum StackScreens {
  Login = 'login',
  Home = 'home'
}

export type RootStackParamList = {
  [StackScreens.Login]: undefined;
  [StackScreens.Home]: {token: string};
};
