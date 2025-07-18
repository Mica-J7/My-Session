import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './sessionlist.scss';
import Session from '../Session/Session.jsx';
import SessionCreator from '../Modals/SessionCreator.jsx';
import ExerciseCreator from '../Modals/ExerciseCreator.jsx';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const buttonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const MODAL_HEIGHT = 200;

  const openModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top + rect.height / 2 - MODAL_HEIGHT / 2 + window.scrollY,
        left: rect.left + rect.width + 16, // 16px de marge vers la droite
      });
    }
    setModalIsOpen(true);
  };

  const handleAddSession = (newSessionFromApi) => {
    setSessions([...sessions, newSessionFromApi]);
    setModalIsOpen(false);
  };

  const handleAddExercise = (sessionId, exerciseData) => {
    const updatedSessions = sessions.map((session) => {
      if (session._id === sessionId) {
        return {
          ...session,
          exercises: [...session.exercises, exerciseData],
        };
      }
      return session;
    });

    setSessions(updatedSessions);
  };

  const handleOpenExerciseModal = (sessionId) => {
    setSelectedSessionId(sessionId);
    setExerciseModalOpen(true);
  };

  return (
    <div className="session-list">
      <h1 className="session-list__title">All sessions :</h1>

      <div className="session-list__grid">
        {sessions.map((session) => (
          <Session
            key={session._id}
            session={session}
            onAddExercise={handleAddExercise}
            onOpenExerciseModal={handleOpenExerciseModal}
          />
        ))}

        <button ref={buttonRef} className="session-list__button" onClick={openModal}>
          <FontAwesomeIcon icon={faPlus} className="session-list__button--icon" />
          <span>New session</span>
        </button>

        <SessionCreator
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onCreate={handleAddSession}
          position={modalPosition}
        />

        <ExerciseCreator
          isOpen={exerciseModalOpen}
          onRequestClose={() => setExerciseModalOpen(false)}
          onCreate={handleAddExercise}
          sessionId={selectedSessionId}
        />
      </div>
    </div>
  );
}

export default SessionList;
