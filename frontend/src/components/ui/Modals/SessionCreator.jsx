import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './session-creator.scss';

function SessionCreator({ isOpen, onRequestClose, onCreate, onEditSession, initialSessionData }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [sessionName, setSessionName] = useState('');

  // Détecter si on est en mode édition ou création
  const isEditing = !!initialSessionData;

  useEffect(() => {
    if (initialSessionData) {
      setSessionName('');
    }
  }, [initialSessionData]);

  const handleSubmit = async () => {
    if (isEditing) {
      // Mode édition
      const updatedSession = {
        ...initialSessionData,
        name: sessionName,
      };

      try {
        await onEditSession(updatedSession); // La fonction se trouve dans le parent
      } catch (err) {
        console.error('Error during update :', err.message);
      }
    } else {
      // Mode création
      try {
        const res = await fetch(`${apiUrl}/api/sessions`, {
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
          console.error('You have to be connected to create a Session');
        }
      } catch (err) {
        console.error('Network error :', err.message);
      }
    }

    onRequestClose();
    setSessionName('');
  };

  const handleClose = () => {
    setSessionName('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEditing ? 'Edit session' : 'Create session'}
      className="session-creator"
      overlayClassName="session-creator__overlay"
    >
      <h2>{isEditing ? 'Edit session :' : 'New session :'}</h2>

      <form onSubmit={(e) => e.preventDefault()} className="session-creator__form">
        <input
          id="sessionNameInput"
          type="text"
          placeholder={isEditing ? 'Edit session name' : 'Enter session name'}
          value={sessionName ?? ''} // ← ici on évite qu’il soit "undefined"
          onChange={(e) => setSessionName(e.target.value)}
          autoComplete="off"
        />
        <div className="session-creator__form__buttons">
          <button onClick={handleSubmit} className="session-creator__form__buttons--ind">
            {isEditing ? 'Edit' : 'Create'}
          </button>
          <button onClick={handleClose} className="session-creator__form__buttons--ind">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default SessionCreator;
