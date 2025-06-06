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
  vote_count: number;
};

export type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  vote_count: number;
};

export type castMemberType = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  cast_id?: number;
  order?: number;
};

export type HeaderType = {
  title: string;
  showBackButton: boolean;
};

export type GenreType = {
  id: number;
  name: string;
};

export type FavoriteMovieType = {
  id: number;
  title: string;
  poster_path: string;
  genres?: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};
