import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { Search } from './components/Search';
import { UserBar } from './components/UserBar';
import { useFavorites } from './context/FavoritesContext';
import { fetchMe } from './store/authActions';
import type { AppDispatch, RootState } from './store/store';
import './styles/App.css';

function App() {
  const { favoritesCount } = useFavorites();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuth } = useSelector((state: RootState) => state.auth || { isAuth: false });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchMe(token));
    }
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">PIXEMA</Link>

          <nav className="header__nav">
            <ul className="navbar__list">
              <li><NavLink to="/" className="navbar__link">Главная</NavLink></li>
              <li><NavLink to="/new" className="navbar__link">Новинки</NavLink></li>
              <li><NavLink to="/trends" className="navbar__link">Подборки</NavLink></li>
              <li><NavLink to="/showtimes" className="navbar__link">Афиша</NavLink></li>

              {isAuth && (
                <li>
                  <NavLink to="/favorites" className="navbar__link">
                    Избранное ({favoritesCount})
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          <div className="header__actions">
            <Search />
            <UserBar />
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Pixema Films. Diplom Project</p>
      </footer>
    </div>
  );
}

export default App;