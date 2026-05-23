import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetMoviesByFiltersQuery } from '../../api/kinopoiskApi';
import { MovieCard } from '../../components/MovieCard';
import { Pagination } from '../../components/Pagination';
import '../HomePage/HomePage.css';

export const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useGetMoviesByFiltersQuery({
        keyword: query,
        page
    });

    if (isLoading) return <div className="status">Поиск по запросу "{query}"...</div>;
    if (isError) return <div className="status">Ошибка при поиске</div>;

    return (
        <div className="home-page">
            <h1 className="home-page__title">Поиск по запросу: {query}</h1>

            {data?.items.length === 0 ? (
                <div className="status">Фильмы не найдены</div>
            ) : (
                <>
                    <div className="home-page__grid">
                        {data?.items.map((movie: any) => (
                            <MovieCard
                                key={movie.kinopoiskId || movie.filmId}
                                id={movie.kinopoiskId || movie.filmId}
                                title={movie.nameRu || movie.nameEn}
                                poster={movie.posterUrlPreview}
                                year={movie.year}
                                genre={movie.genres[0]?.genre}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={page}
                        totalPages={data?.totalPages || 1}
                        onPageChange={(p) => setPage(p)}
                    />
                </>
            )}
        </div>
    );
};