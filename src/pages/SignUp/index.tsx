import React, { useState, useEffect, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { registerUser } from '../../store/authActions';
import { clearError, clearAuthState } from '../../store/authSlice';
import '../../styles/auth.css';

export const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, registrationSuccess } = useSelector((state: RootState) => state.auth || {});

    useEffect(() => {
        return () => {
            dispatch(clearAuthState());
        };
    }, [dispatch]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch(registerUser({
            username,
            email,
            password,
            course_group: 20
        }));
    };

    const handleCloseError = () => {
        dispatch(clearError());
    };

    if (registrationSuccess) {
        return (
            <div className="auth-container">
                <div className="auth-card success-card">
                    <h2>🎉 Успешная регистрация!</h2>
                    <p>На Вашу почту <strong>{email}</strong> отправлено письмо для активации аккаунта.</p>
                    <p className="auth-hint">Пожалуйста, вставьте ссылку из письма, чтобы подтвердить профиль, а затем возвращайтесь для входа.</p>
                    <Link to="/activate" className="auth-submit-btn">Перейти к активации</Link>
                </div>
            </div>
        );
    }

    const renderErrors = () => {
        if (!error) return null;
        if (typeof error === 'string') return <p>{error}</p>;

        return Object.keys(error).map((key) => (
            <p key={key}>
                <strong>{key}:</strong> {Array.isArray(error[key]) ? error[key].join(', ') : error[key]}
            </p>
        ));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Регистрация</h2>

                {error && (
                    <div className="auth-alert error-alert">
                        <div className="alert-content">{renderErrors()}</div>
                        <button className="alert-close" onClick={handleCloseError}>&times;</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Имя пользователя (никнейм)</label>
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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
                        {isLoading ? 'Регистрация...' : 'Создать аккаунт'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};