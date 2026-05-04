import React from 'react';
import { useGetMoviesQuery } from '../../api/kinopoiskApi';

export const HomePage = () => {
  const { data, isLoading, error } = useGetMoviesQuery(1);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;

  return (
    <div>
      <h1>Популярные фильмы</h1>
      <pre>{JSON.stringify(data?.items?.slice(0, 3), null, 2)}</pre>
    </div>
  );
};