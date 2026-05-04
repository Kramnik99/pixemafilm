import { Outlet } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="header__logo">PIXEMA</div>
        <nav className="header__nav">
          <span>Search Placeholder</span>
        </nav>
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