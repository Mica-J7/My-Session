import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Banner from '@/components/ui/Banner/Banner.jsx';
import LoginModal from '../ui/Modals/AuthModal';
import logo from '@/assets/logo/logo.svg';
import './header.scss';

function Header() {
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
    <header>
      <div className="header__top">
        <div className="header__top__logo">
          <img src={logo} />
        </div>
        <h1>My Session</h1>
        <nav className="header__top__nav">
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
      </div>

      <Banner />

      <LoginModal
        isOpen={isLoginOpen}
        onRequestClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true); // Marque l'utilisateur comme connecté
        }}
      />
    </header>
  );
}

export default Header;
