import React from 'react';
import './Filters.css';

interface FiltersProps {
    onFilterChange: (filters: any) => void;
    filters: any;
    onReset: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange, filters, onReset }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="filters">
            <div className="filter-group">
                <label>Тип</label>
                <select name="type" value={filters.type} onChange={handleChange} className="filter-select">
                    <option value="ALL">Все</option>
                    <option value="FILM">Фильмы</option>
                    <option value="TV_SERIES">Сериалы</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Год от</label>
                <input
                    type="number"
                    name="yearFrom"
                    placeholder="1990"
                    value={filters.yearFrom}
                    onChange={handleChange}
                    className="filter-input"
                />
            </div>

            <div className="filter-group">
                <label>Жанр (ID)</label>
                <select name="genres" value={filters.genres} onChange={handleChange} className="filter-select">
                    <option value="">Все жанры</option>
                    <option value="1">Триллер</option>
                    <option value="2">Драма</option>
                    <option value="3">Криминал</option>
                    <option value="4">Мелодрама</option>
                </select>
            </div>

            <button className="filters-reset" onClick={onReset}>Сбросить</button>
        </div>
    );
};