import './session.scss';
import Exercise from '../Exercise/Exercise.jsx';

function Session({ name, exercises }) {
  return (
    <div className="session">
      <h3>{name}</h3>
      {exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

export default Session;
