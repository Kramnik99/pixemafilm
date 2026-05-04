import { Outlet, Link } from 'react-router-dom';
import { Search } from './components/Search';
import './styles/App.css';

function App() {
  return (
    <div className="app-wrapper">
      <header className="header">
        <Link to="/" className="header__logo">PIXEMA</Link>

        <div className="header__actions">
          <Search />
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