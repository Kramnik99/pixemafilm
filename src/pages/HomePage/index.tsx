import React, { useState } from 'react';
import { useGetMoviesByFiltersQuery } from '../../api/kinopoiskApi';
import { MovieCard } from '../../components/MovieCard';
import { Pagination } from '../../components/Pagination';
import { Filters } from '../../components/Filters';
import type { IFilters } from '../../types/types';
import './HomePage.css';

const initialFilters: IFilters = {
  type: 'ALL',
  yearFrom: '',
  genres: '',
};

export const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const { data, isLoading, isError, isFetching } = useGetMoviesByFiltersQuery({
    page,
    type: filters.type,
    yearFrom: filters.yearFrom ? Number(filters.yearFrom) : undefined,
    genres: filters.genres ? Number(filters.genres) : undefined,
  });

  const handleFilterChange = (newFilters: IFilters) => {
  setFilters(newFilters);
  setPage(1);
};

  const handleReset = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  if (isLoading) return <div className="status">Загрузка...</div>;
  if (isError) return <div className="status">Произошла ошибка при загрузке данных.</div>;

  return (
    <div className="home-page">
      <h1 className="home-page__title">Каталог фильмов</h1>

      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {isFetching && <div className="status">Обновление...</div>}

      <div className="home-page__grid">
        {data?.items?.map((movie: any) => (
          <MovieCard
            key={movie.kinopoiskId}
            id={movie.kinopoiskId}
            title={movie.nameRu || movie.nameEn}
            poster={movie.posterUrlPreview}
            year={movie.year}
            genre={movie.genres[0]?.genre}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={data?.totalPages || 1}
      />
    </div>
  );
};