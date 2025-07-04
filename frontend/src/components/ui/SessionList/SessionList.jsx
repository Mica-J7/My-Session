import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './sessionlist.scss';
import Session from '../Session/Session.jsx';
import SessionCreator from '../Modal/SessionCreator.jsx';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddSession = (name) => {
    const newSession = {
      id: Date.now(),
      name,
      exercises: [],
    };
    setSessions([...sessions, newSession]);
  };

  return (
    <div className="session-list">
      <h1 className="session-list__title">All sessions :</h1>

      <div className="session-list__grid">
        {sessions.map((session) => (
          <Session key={session.id} name={session.name} exercises={session.exercises} />
        ))}

        <button className="session-list__button" onClick={() => setModalIsOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className="session-list__button--icon" />

          <span>New session</span>
        </button>
        <SessionCreator isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} onCreate={handleAddSession} />
      </div>
    </div>
  );
}

export default SessionList;
