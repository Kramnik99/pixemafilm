import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import './UserBar.css';

export const UserBar: React.FC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth || { isAuth: false, user: null });
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const userBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && userBarRef.current && !userBarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getInitials = () => {
    if (!user) return '?';
    const name = user.username || 'User';
    return name[0].toUpperCase();
  };

  if (!isAuth) {
    return (
      <div className="auth-links">
        <Link to="/login" className="auth-btn">Вход</Link>
        <span className="divider">|</span>
        <Link to="/register" className="auth-btn">Регистрация</Link>
      </div>
    );
  }

  return (
    <div className="user-bar" ref={userBarRef}>
      <div className="user-bar-trigger" onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <div className="user-avatar">{getInitials()}</div>
        <div className="user-info">
          <span className="user-name">{user?.username}</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="user-dropdown">
          <Link to="/settings" className="dropdown-item" onClick={() => setIsOpen(false)}>Настройки</Link>
          <button
            onClick={() => {
              dispatch(logout());
              setIsOpen(false);
            }}
            className="dropdown-item logout"
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
};