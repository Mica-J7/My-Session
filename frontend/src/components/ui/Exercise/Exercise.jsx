import './exercise.scss';

function Exercise({ exercise }) {
  const { name, sets, reps, weight, rest, distance, time, note } = exercise;

  return (
    <div className="exercise">
      <h4 className="exercise__title">{name} :</h4>
      <div className="exercise__content">
        {sets != null && reps != null && (
          <p>
            Sets : {sets} x {reps} reps
          </p>
        )}
        {weight != null && <p>Weight : {weight} kg</p>}
        {rest != null && <p>Rest : {rest} s</p>}
        {time != null && <p>Time : {time} min</p>}
        {distance != null && <p>Distance : {distance} km</p>}
        {note?.trim() && (
          <div className="exercise__content--note">
            <strong>Note :</strong> {note}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;
