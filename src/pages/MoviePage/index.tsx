import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../../api/kinopoiskApi';
import { useFavorites } from '../../context/FavoritesContext';
import './MoviePage.css';

export const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(id || '');

  const { isFavorite, toggleFavorite } = useFavorites();
  const favoriteStatus = id ? isFavorite(id) : false;

  const handleToggleFavorite = () => {
    if (movie && id) {
      toggleFavorite({
        id: String(id),
        title: movie.nameRu || movie.nameEn || 'Без названия',
        poster: movie.posterUrlPreview || movie.posterUrl || ''
      });
    }
  };

  if (isLoading) return <div className="status">Загрузка деталей фильма...</div>;
  if (isError) return <div className="status">Не удалось загрузить информацию о фильме.</div>;
  if (!movie) return <div className="status">Фильм не найден.</div>;

  return (
    <div className="movie-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Назад
      </button>

      <div className="movie-details">
        <div className="movie-details__left">
          <img
            className="movie-details__poster"
            src={movie.posterUrl}
            alt={movie.nameRu || movie.nameEn || 'Постер'}
          />
        </div>

        <div className="movie-details__right">
          <h1 className="movie-details__title">{movie.nameRu || movie.nameEn}</h1>
          <button
            className={`favorite-btn ${favoriteStatus ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {favoriteStatus ? '❤️ В избранном' : '🤍 Добавить в избранное'}
          </button>

          {movie.slogan && <p className="movie-details__slogan">«{movie.slogan}»</p>}

          <div className="movie-details__main-info">
            <div className="info-item">
              <span className="info-item__label">Рейтинг:</span>
              <span className="info-item__value rating-accent">
                {movie.ratingKinopoisk || movie.ratingImdb || '—'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-item__label">Год:</span>
              <span className="info-item__value">{movie.year}</span>
            </div>
            <div className="info-item">
              <span className="info-item__label">Время:</span>
              <span className="info-item__value">{movie.filmLength} мин.</span>
            </div>
            <div className="info-item">
              <span className="info-item__label">Страна:</span>
              <span className="info-item__value">
                {movie.countries?.map((c: any) => c.country).join(', ')}
              </span>
            </div>
            <div className="info-item">
              <span className="info-item__label">Жанр:</span>
              <span className="info-item__value">
                {movie.genres?.map((g: any) => g.genre).join(', ')}
              </span>
            </div>
          </div>

          <div className="movie-details__description-block">
            <h3>Описание</h3>
            <p className="movie-details__description">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};