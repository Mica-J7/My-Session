import { useState, useRef } from 'react';
import ExerciseCreator from '../Modals/ExerciseCreator.jsx';
import Exercise from '../Exercise/Exercise.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './session.scss';

const MODAL_HEIGHT = 400;

function Session({ session, onAddExercise }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 100, left: 100 });
  const buttonRef = useRef(null);

  const openModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top + rect.height / 2 - MODAL_HEIGHT / 2 + window.scrollY,
        left: rect.left + rect.width + 16,
      });
    }
    setModalIsOpen(true);
  };

  const handleAdd = (exerciseData) => {
    onAddExercise(session.id, exerciseData);
  };

  return (
    <div className="session">
      <h3 className="session__title">{session.name} :</h3>

      <div className="session__exercises">
        {session.exercises.map((ex) => (
          <Exercise key={ex.id} {...ex} />
        ))}

        <button ref={buttonRef} onClick={openModal} className="session__exercises-button">
          <FontAwesomeIcon icon={faPlus} className="session__exercises-button--icon" />
        </button>
      </div>
      <ExerciseCreator
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onCreate={handleAdd}
        position={modalPosition}
      />
    </div>
  );
}

export default Session;
