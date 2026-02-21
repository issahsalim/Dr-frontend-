import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-name">Dr. Haruna Gado Yakubu</p>
        <p className="footer-org">University of Cape Coast</p>
        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>
        <p className="footer-copy">© {year} Dr. Haruna Gado Yakubu. All rights reserved.</p>
      </div>
    </footer>
  );
}
