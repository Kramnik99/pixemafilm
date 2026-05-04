import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

export const Search: React.FC = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            navigate(`/search?query=${value}`);
            setValue('');
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                placeholder="Поиск фильма..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </form>
    );
};