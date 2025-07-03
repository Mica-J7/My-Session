import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './session.scss';
import Exercise from '../Exercise/Exercise.jsx';

function Session({ name }) {
  const [exercises, setExercises] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    rest: '',
    time: '',
    distance: '',
    note: '',
  });

  const handleAddExercise = () => {
    const exerciseToAdd = {
      id: Date.now(),
      ...newExercise,
    };
    setExercises([...exercises, exerciseToAdd]);

    setNewExercise({
      name: '',
      sets: '',
      reps: '',
      weight: '',
      rest: '',
      time: '',
      distance: '',
      note: '',
    });
    setShowForm(false);
  };

  return (
    <div className="session">
      <h3 className="session__title">{name}</h3>

      {showForm && (
        <form
          className="session__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddExercise();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={newExercise.name}
            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Sets"
            value={newExercise.sets}
            onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
          />
          <input
            type="number"
            placeholder="Reps"
            value={newExercise.reps}
            onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
          />
          <input
            type="text"
            placeholder="Weight (kg)"
            value={newExercise.weight}
            onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
          />
          <input
            type="number"
            placeholder="Rest (sec)"
            value={newExercise.rest}
            onChange={(e) => setNewExercise({ ...newExercise, rest: e.target.value })}
          />
          <input
            type="number"
            placeholder="Time (min)"
            value={newExercise.time}
            onChange={(e) => setNewExercise({ ...newExercise, time: e.target.value })}
          />
          <input
            type="number"
            placeholder="Distance (km)"
            value={newExercise.distance}
            onChange={(e) => setNewExercise({ ...newExercise, distance: e.target.value })}
          />
          <input
            type="text"
            placeholder="Note"
            value={newExercise.note}
            onChange={(e) => setNewExercise({ ...newExercise, note: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <div className="session__exercises">
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}

        <button onClick={() => setShowForm(!showForm)} className="session__exercises-button">
          <FontAwesomeIcon icon={faPlus} className="session__exercises-button--icon" />
          {showForm ? 'Cancel' : 'Create exercise'}
        </button>
      </div>
    </div>
  );
}

export default Session;
