import { useState } from 'react';
import Modal from 'react-modal';
import './session-creator.scss';

function SessionCreator({ isOpen, onRequestClose, onCreate }) {
  const [sessionName, setSessionName] = useState('');

  const handleCreate = async () => {
    const res = await fetch('http://localhost:3000/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: sessionName }),
    });

    const data = await res.json();
    if (res.ok) {
      onCreate(data.session);
    } else {
      console.error('Erreur lors de la création :', data.message);
    }
    onRequestClose();
  };

  const handleClose = () => {
    setSessionName('');
    onRequestClose();
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
        id="sessionNameInput"
        type="text"
        placeholder="Enter session name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
      />
      <div>
        <button
          onClick={() => {
            handleCreate();
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
