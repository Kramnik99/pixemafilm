import { Outlet, Link } from 'react-router-dom';
import { Search } from './components/Search';
import { useFavorites } from './context/FavoritesContext';
import './styles/App.css';

function App() {
  const { favoritesCount } = useFavorites();
  return (
    <div className="app-wrapper">
      <header className="header">
        <Link to="/" className="header__logo">PIXEMA</Link>

        <div className="header__actions">
          <Search />
          <Link to="/favorites" className="header__favorite-btn" title="Избранное">
            <span className="heart-icon">❤️</span>
            <span className="favorite-text">Избранное ({favoritesCount})</span>
          </Link>
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