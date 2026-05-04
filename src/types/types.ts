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

export interface IMovieResponse {
    total: number;
    totalPages: number;
    items: IMovie[];
}