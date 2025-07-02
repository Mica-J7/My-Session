import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '@/assets/logo/logo.svg';

function Header() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

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
          <li>Connexion</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
