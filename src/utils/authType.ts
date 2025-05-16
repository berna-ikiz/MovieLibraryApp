export type UserInfo = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthState = {
  currentUser: UserInfo | null;
  error: string | null;
  loading: boolean;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  Details: { movieId: number };
};
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
