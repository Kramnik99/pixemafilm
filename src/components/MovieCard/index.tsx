import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

interface MovieCardProps {
    id: number | string;
    title: string;
    poster: string;
    year: number | string;
    genre: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    poster,
    year,
    genre
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="movie-card" onClick={handleCardClick}>
            <div className="movie-card__poster-wrapper">
                <img
                    className="movie-card__poster"
                    src={poster}
                    alt={title}
                    loading="lazy"
                />
            </div>
            <h3 className="movie-card__title" title={title}>{title}</h3>
            <div className="movie-card__info">
                <span className="movie-card__year">{year}</span>
                <span className="movie-card__genre">{genre}</span>
            </div>
        </div>
    );
};