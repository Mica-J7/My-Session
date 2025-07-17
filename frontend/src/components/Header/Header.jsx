import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from '../ui/Modals/AuthModal';
import logo from '@/assets/logo/logo.svg';
import './header.scss';

function Header() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = (credentials) => {
    console.log('Connexion avec :', credentials);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className="header__logo">
        <img src={logo} />
        <h1>My Session</h1>
      </div>
      <nav>
        <ul>
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

      <LoginModal isOpen={isLoginOpen} onRequestClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
    </header>
  );
}

export default Header;
