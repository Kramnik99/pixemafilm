export interface IGenre {
  genre: string;
}

export interface ICountry {
  country: string;
}

export interface IMovie {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: ICountry[];
  genres: IGenre[];
  ratingKinopoisk: number | null;
  ratingImdb: number | null;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
}
export interface IMovieFull extends IMovie {
  description: string | null;
  shortDescription: string | null;
  ratingAgeLimits: string | null;
  filmLength: number | null;
  slogan: string | null;
}

export interface IMovieResponse {
  total: number;
  totalPages: number;
  items: IMovie[];
}

export interface IFilters {
  type: string;
  yearFrom: string;
  genres: string;
}

export interface IMovieFilterParams {
  keyword?: string;
  yearFrom?: number;
  yearTo?: number;
  genres?: number;
  type?: string;
  page: number;
}