import { useState } from 'react';
import './session.scss';
import Exercise from '../Exercise/Exercise.jsx';

function Session({ name }) {
  const [exercises, setExercises] = useState([]);

  const handleAddExercise = () => {
    const newExercise = {
      id: Date.now(),
      name: 'New exercise',
      sets: null,
      reps: null,
      weight: null,
      rest: null,
      time: null,
      distance: null,
      note: '',
    };
    setExercises([...exercises, newExercise]);
  };

  return (
    <div className="session">
      <h3 className="session__title">{name}</h3>
      <button onClick={handleAddExercise}>Add exercise</button>

      <div className="session__exercises">
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

export default Session;
