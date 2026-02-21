import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const sectionLinks = [
    { hash: 'about', label: 'About' },
    { hash: 'stats', label: 'Work' },
    { hash: 'research', label: 'Research' },
    { hash: 'publications', label: 'Publications' },
    { hash: 'projects', label: 'Projects' },
    { hash: 'awards', label: 'Awards' },
    { hash: 'contact', label: 'Contact' },
  ];

  const handleSectionClick = (e, hash) => {
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
      setOpen(false);
      return;
    }
    e.preventDefault();
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Dr. H. G. Yakubu
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
        </button>
        <nav className={`navbar-menu ${open ? 'open' : ''}`}>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {sectionLinks.map(({ hash, label }) => (
            <a
              key={hash}
              href={`/#${hash}`}
              className="navbar-section-link"
              onClick={(e) => handleSectionClick(e, hash)}
            >
              {label}
            </a>
          ))}
          <Link
            to="/gallery"
            className={location.pathname === '/gallery' ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            Gallery
          </Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
