import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './auth-modal.scss';

function AuthModal({ isOpen, onRequestClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      console.log('Successfully logged in');

      onRequestClose(); // Ferme la modale
      onLoginSuccess?.(); // Recharge les sessions depuis le parent
      window.location.reload();
    } catch (err) {
      console.error('Login error', err.message);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      console.log('Signup successful');
      onRequestClose();
    } catch (err) {
      console.error('Signup error :', err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="auth-modal"
      overlayClassName="auth-modal__overlay"
    >
      <h2>Login / Signup :</h2>

      <form onSubmit={(e) => e.preventDefault()} className="auth-modal__form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="exercise-creator__form__group"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="exercise-creator__form__group"
        />

        <div className="auth-modal__form__buttons">
          <button type="button" onClick={handleLogin} className="auth-modal__form__buttons--ind">
            Login
          </button>
          <button type="button" onClick={handleSignup} className="auth-modal__form__buttons--ind">
            Signup
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AuthModal;
