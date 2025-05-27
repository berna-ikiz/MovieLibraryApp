export type UserInfo = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthState = {
  currentUser: UserInfo | null;
  error: string | null;
  loading: boolean;
  checkingAuth: boolean;
};

export type RootStackParamList = {
  MainTabs: undefined;
  HomeScreen: undefined;
  Details: { movieId: number };
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
