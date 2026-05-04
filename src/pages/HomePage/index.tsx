import React, { useState } from 'react';
import { useGetMoviesQuery } from '../../api/kinopoiskApi';
import { MovieCard } from '../../components/MovieCard';
import { Pagination } from '../../components/Pagination';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetMoviesQuery(page);

  if (isLoading) return <div className="status">Загрузка...</div>;
  if (isError) return <div className="status">Ошибка загрузки данных</div>;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-page">
      <h1 className="home-page__title">Популярные</h1>

      {isFetching && <div className="status">Обновление...</div>}

      <div className="home-page__grid">
        {data?.items?.map((movie: any) => (
          <MovieCard
            key={movie.kinopoiskId}
            title={movie.nameRu || movie.nameEn}
            poster={movie.posterUrlPreview}
            year={movie.year}
            genre={movie.genres[0]?.genre}
            onClick={() => console.log('Movie ID:', movie.kinopoiskId)}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={data?.totalPages || 1}
      />
    </div>
  );
};