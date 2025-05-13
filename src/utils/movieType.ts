export type MovieType = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  adult: boolean;
  vote_avarage: number;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  Details: { movie: MovieType };
};

export type HeaderType = {
  title: string;
  showBackButton: boolean;
};
