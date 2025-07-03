import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './sessionlist.scss';
import Session from '../Session/Session.jsx';

function SessionList() {
  const [sessions, setSessions] = useState([]);

  const handleAddSession = () => {
    const newSession = {
      id: Date.now(),
      name: 'New session',
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

        <button className="session-list__button" onClick={handleAddSession}>
          <FontAwesomeIcon icon={faPlus} className="session-list__button--icon" />
          <span>New session</span>
        </button>
      </div>
    </div>
  );
}

export default SessionList;
