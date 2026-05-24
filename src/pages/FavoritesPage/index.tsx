import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { MovieCard } from '../../components/MovieCard';
import type { RootState } from '../../store/store';
import '../HomePage/HomePage.css';

export const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();
    const navigate = useNavigate();
    const { isAuth, isLoading } = useSelector((state: RootState) => state.auth || { isAuth: false, isLoading: false });

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate('/login');
        }
    }, [isAuth, isLoading, navigate]);
    
    if (isLoading || !isAuth) {
        return null;
    }

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