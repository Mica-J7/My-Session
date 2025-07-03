import './exercise.scss';

function Exercise({ exercise }) {
  const { name, sets, reps, weight, rest, distance, time, note } = exercise;

  const hasValue = (value) => value !== null && value !== undefined && value !== '' && value !== 0;

  return (
    <div className="exercise">
      <h4 className="exercise__title">{name} :</h4>
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
