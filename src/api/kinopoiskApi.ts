import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, API_KEY } from './constants';
import type { IMovieResponse } from '../types/types';

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', API_KEY);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<IMovieResponse, number>({
      query: (page = 1) => `/films/collections?type=TOP_POPULAR_ALL&page=${page}`,
    }),
    getMoviesBySearch: builder.query<IMovieResponse, { keyword: string; page: number }>({
      query: ({ keyword, page = 1 }) =>
        `/films?keyword=${keyword}&page=${page}`,
    }),
    getMovieDetails: builder.query<any, string>({
      query: (id) => `/films/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMoviesBySearchQuery, useGetMovieDetailsQuery } = kinopoiskApi;