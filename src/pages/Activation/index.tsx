import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';
import { activateUser } from '../../store/authActions';
import '../../styles/auth.css';

export const Activation: React.FC = () => {
    const [activationLink, setActivationLink] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [isActivated, setIsActivated] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        const match = activationLink.match(/activate\/([^/]+)\/([^/]+)/);

        if (!match) {
            setLocalError('Некорректная ссылка! Пожалуйста, вставьте полную ссылку из письма.');
            return;
        }

        const uid = match[1];
        const token = match[2];

        const resultAction = await dispatch(activateUser({ uid, token }));

        if (activateUser.fulfilled.match(resultAction)) {
            setIsActivated(true);
        }
    };

    if (isActivated) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>🎉 Аккаунт активирован!</h2>
                    <p>Теперь ты можешь войти в систему, используя свою почту и пароль.</p>
                    <button className="auth-submit-btn" onClick={() => navigate('/login')}>
                        Перейти ко входу
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card text-center">
                <h2>Подтверждение аккаунта</h2>
                <p className="auth-hint">Вставь ссылку, полученную в письме, чтобы активировать профиль:</p>

                <form onSubmit={handleActivate} className="auth-form">
                    {(localError || error) && (
                        <div className="auth-alert error-alert">
                            {localError || 'Ошибка активации. Возможно, ссылка устарела.'}
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="activation-input"
                            placeholder="Вставь ссылку сюда..."
                            value={activationLink}
                            onChange={(e) => setActivationLink(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                        {isLoading ? 'Активация...' : 'Активировать'}
                    </button>
                </form>
            </div>
        </div>
    );
};