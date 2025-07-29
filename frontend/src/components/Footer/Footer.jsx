import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginModal from '../ui/Modals/AuthModal';
import './footer.scss';

function Footer() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <footer>
      <div className="footer__p">
        <p>© 2025 My Session</p>
        <p>-------------------</p>
        <p>Created by me</p>
      </div>

      <nav className="footer__nav">
        <ul>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link to={isAboutPage ? '/' : '/about'}>{isAboutPage ? 'Home' : 'About'}</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={() => setIsLoginOpen(true)}>Login</button>
            )}
          </li>
        </ul>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onRequestClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true); // Marque l'utilisateur comme connecté
        }}
      />
    </footer>
  );
}

export default Footer;
