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
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default SessionCreator;
