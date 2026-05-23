import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { MovieCard } from '../../components/MovieCard';
import '../HomePage/HomePage.css';

export const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();

    return (
        <div className="home-page">
            <h1 className="home-page__title">Избранное</h1>

            {favorites.length === 0 ? (
                <div className="status">У вас пока нет избранных фильмов</div>
            ) : (
                <div className="home-page__grid">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster}
                            year="Избранное"
                            genre="Фильм"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};