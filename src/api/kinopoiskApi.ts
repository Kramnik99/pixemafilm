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
    getMoviesByFilters: builder.query<IMovieResponse, {
      keyword?: string;
      yearFrom?: number;
      genres?: number;
      type?: string;
      page: number
    }>({
      query: ({ keyword, yearFrom, genres, type, page = 1 }) => {
        let url = `/films?page=${page}`;
        if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
        if (yearFrom) url += `&yearFrom=${yearFrom}`;
        if (genres) url += `&genres=${genres}`;
        if (type && type !== 'ALL') url += `&type=${type}`;
        return url;
      },
    }),
    getMovieDetails: builder.query<any, string>({
      query: (id) => `/films/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMoviesByFiltersQuery, useGetMovieDetailsQuery } = kinopoiskApi;