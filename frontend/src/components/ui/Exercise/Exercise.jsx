import './exercise.scss';

function Exercise({ exercise }) {
  const { name, sets, reps, weight, rest, informations } = exercise;

  return (
    <div className="exercise">
      <h4>{name}</h4>
      <p>
        {sets} x {reps} à {weight}kg
      </p>
      <p>Rest : {rest}s</p>
      <p>{informations}</p>
    </div>
  );
}

export default Exercise;
