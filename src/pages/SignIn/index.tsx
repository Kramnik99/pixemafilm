import React, { useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { loginUser, fetchMe } from '../../store/authActions';
import { clearError } from '../../store/authSlice';

import '../../styles/auth.css';

export const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const { isLoading, error } = useSelector((state: RootState) => state.auth || {});
    const message = location.state?.message;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            const token = resultAction.payload;
            await dispatch(fetchMe(token));
            navigate('/');
        }
    };

    const handleCloseError = () => {
        dispatch(clearError());
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Вход</h2>

                {message && (
                    <div className="auth-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="auth-alert error-alert">
                        <div className="alert-content">
                            <p>{typeof error === 'string' ? error : 'Неверный email или пароль!'}</p>
                        </div>
                        <button className="alert-close" onClick={handleCloseError}>&times;</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Электронная почта</label>
                        <input
                            type="email"
                            required
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                        {isLoading ? 'Вход...' : 'Войти в профиль'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Ещё нет аккаунта? <Link to="/register">Регистрация</Link>
                </p>
            </div>
        </div>
    );
};