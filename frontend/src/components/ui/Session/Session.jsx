import Exercise from '../Exercise/Exercise.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './session.scss';

function Session({
  session,
  sessionId,
  onEditSession,
  onDeleteSession,
  onOpenExerciseModal,
  onEditExercise,
  onDeleteExercise,
}) {
  return (
    <div className="session">
      <div className="session__header">
        <h3 className="session__title" onClick={() => onEditSession(sessionId, session)}>
          {session.name} :
        </h3>
        <div className="session__buttons">
          <button onClick={() => onEditSession(sessionId, session)} className="session__buttons">
            <FontAwesomeIcon icon={faPenToSquare} className="session__buttons__icon" />
          </button>
          <button onClick={() => onDeleteSession(session._id)} className="session__buttons">
            <FontAwesomeIcon icon={faTrash} className="session__buttons__icon" />
          </button>
        </div>
      </div>
      <div className="session__exercises">
        {session.exercises.map((ex) => (
          <Exercise
            key={ex._id}
            {...ex}
            exercise={ex}
            sessionId={session._id}
            onEditExercise={onEditExercise}
            onDeleteExercise={onDeleteExercise}
          />
        ))}

        <div onClick={() => onOpenExerciseModal(session._id)} className="session__exercises__card">
          <button className="session__exercises__card-button">
            <FontAwesomeIcon icon={faPlus} className="session__exercises__card-button--icon" />
          </button>
          <p>Add Exercise</p>
        </div>
      </div>
    </div>
  );
}

export default Session;
