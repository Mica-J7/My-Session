import Exercise from '../Exercise/Exercise.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './session.scss';

function Session({ session, onOpenExerciseModal }) {
  return (
    <div className="session">
      <h3 className="session__title">{session.name} :</h3>

      <div className="session__exercises">
        {session.exercises.map((ex) => (
          <Exercise key={ex._id} {...ex} />
        ))}

        <button onClick={() => onOpenExerciseModal(session._id)} className="session__exercises-button">
          <FontAwesomeIcon icon={faPlus} className="session__exercises-button--icon" />
        </button>
      </div>
    </div>
  );
}

export default Session;
