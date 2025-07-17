import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './auth-modal.scss';

function AuthModal({ isOpen, onRequestClose, onLogin }) {
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
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      console.log('Connexion réussie !');
      onRequestClose();
    } catch (err) {
      console.error('Erreur lors de la connexion :', err.message);
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

      console.log('Inscription réussie !');
      onRequestClose();
    } catch (err) {
      console.error('Erreur lors de l’inscription :', err.message);
    }
  };

  const handleSubmit = () => {
    onLogin({ email, password });
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="auth-modal">
      <h2>Connexion ou inscription :</h2>

      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="auth-modal__buttons">
        <button
          onClick={() => {
            handleLogin();
            handleSubmit();
          }}
        >
          Se connecter
        </button>
        <button onClick={handleSignup}>Créer un compte</button>
      </div>
    </Modal>
  );
}

export default AuthModal;
