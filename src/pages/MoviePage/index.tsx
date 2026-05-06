import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../api/kinopoiskApi';
import './MoviePage.css';

export const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(id || '');

  if (isLoading) return <div className="status">Загрузка данных...</div>;
  if (isError) return <div className="status">Ошибка при загрузке фильма</div>;
  if (!movie) return <div className="status">Фильм не найден</div>;

  return (
    <div className="movie-details">
      <img
        className="movie-details__poster"
        src={movie.posterUrl}
        alt={movie.nameRu || 'Poster'}
      />

      <div className="movie-details__content">
        <h1 className="movie-details__title">{movie.nameRu || movie.nameEn}</h1>
        {movie.shortDescription && (
          <p className="movie-details__short-desc">{movie.shortDescription}</p>
        )}

        <div className="movie-details__info">
          <div className="movie-details__info-row">
            <span className="movie-details__label">Рейтинг:</span>
            <span className="movie-details__value">
              <span className="rating-badge">{movie.ratingKinopoisk || movie.ratingImdb || '—'}</span>
            </span>
          </div>

          <div className="movie-details__info-row">
            <span className="movie-details__label">Год:</span>
            <span className="movie-details__value">{movie.year}</span>
          </div>

          <div className="movie-details__info-row">
            <span className="movie-details__label">Страна:</span>
            <span className="movie-details__value">
              {movie.countries.map((c: any) => c.country).join(', ')}
            </span>
          </div>

          <div className="movie-details__info-row">
            <span className="movie-details__label">Жанр:</span>
            <span className="movie-details__value">
              {movie.genres.map((g: any) => g.genre).join(', ')}
            </span>
          </div>
        </div>

        <p className="movie-details__description">{movie.description}</p>
      </div>
    </div>
  );
};