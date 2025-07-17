import { useState } from 'react';
import Modal from 'react-modal';
import './session-creator.scss';

function SessionCreator({ isOpen, onRequestClose, onCreate }) {
  const [sessionName, setSessionName] = useState('');

  const handleCreate = () => {
    if (sessionName.trim()) {
      onCreate(sessionName.trim());
      setSessionName('');
    }
    onRequestClose();
  };

  const handleClose = () => {
    setSessionName('');
    onRequestClose();
  };

  const createSession = async (sessionData) => {
    try {
      const res = await fetch('http://localhost:3000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ⚠️ Important !
        },
        body: JSON.stringify(sessionData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log('Session enregistrée :', data);
    } catch (err) {
      console.error('Erreur lors de la création de la session :', err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create session"
      className="session-creator"
      overlayClassName="session-creator__overlay"
    >
      <h2>New session :</h2>
      <input
        type="text"
        placeholder="Enter session name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
      />
      <div>
        <button
          onClick={() => {
            handleCreate();
            createSession();
          }}
        >
          Create
        </button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default SessionCreator;
