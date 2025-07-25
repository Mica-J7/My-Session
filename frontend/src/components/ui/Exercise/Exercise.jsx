import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './exercise.scss';

function Exercise({
  name,
  sets,
  reps,
  weight,
  rest,
  time,
  distance,
  note,
  sessionId,
  exercise,
  onEditExercise,
  onDeleteExercise,
}) {
  const hasValue = (value) => value !== null && value !== undefined && value !== '' && value !== 0;

  return (
    <div onClick={() => onEditExercise(sessionId, exercise)} className="exercise" title="Update">
      <div className="exercise__header">
        <h4 className="exercise__title">{name}</h4>
        <div className="exercise__buttons">
          <button onClick={() => onDeleteExercise(sessionId, exercise._id)} className="exercise__buttons">
            <FontAwesomeIcon icon={faTrash} className="exercise__buttons__icon" />
          </button>
        </div>
      </div>
      <div className="exercise__content">
        {(hasValue(sets) || hasValue(reps)) && (
          <p>
            Sets : {sets} x {reps} reps
          </p>
        )}
        {hasValue(weight) && (
          <p>
            Weight : {weight} {isNaN(weight) ? '' : ' kg'}
          </p>
        )}
        {hasValue(rest) && <p>Rest : {rest} s</p>}
        {hasValue(time) && <p>Time : {time} min</p>}
        {hasValue(distance) && <p>Distance : {distance} km</p>}
        {hasValue(note) && (
          <div className="exercise__content--note">
            <strong>Note :</strong> {note}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;
