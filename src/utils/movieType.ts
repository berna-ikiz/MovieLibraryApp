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
  vote_average: number;
};
export type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
};

export type RootStackParamList = {
  HomeScreen: undefined;
  Details: { movieId: number };
};

export type HeaderType = {
  title: string;
  showBackButton: boolean;
};
