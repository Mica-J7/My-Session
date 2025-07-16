import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import './exercise-creator.scss';

function ExerciseCreator({ isOpen, onRequestClose, onCreate }) {
  const [exercise, setExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    rest: '',
    time: '',
    distance: '',
    note: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setExercise({
        name: '',
        sets: '',
        reps: '',
        weight: '',
        rest: '',
        time: '',
        distance: '',
        note: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onCreate(exercise);
    setExercise({
      name: '',
      sets: '',
      reps: '',
      weight: '',
      rest: '',
      time: '',
      distance: '',
      note: '',
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ajouter un exercice"
      className="exercise-creator"
      overlayClassName="exercise-creator__overlay"
    >
      <h2>Add exercise :</h2>

      <input name="name" value={exercise.name} onChange={handleChange} placeholder="Name" />
      <input name="sets" value={exercise.sets} onChange={handleChange} placeholder="Sets" />
      <input name="reps" value={exercise.reps} onChange={handleChange} placeholder="Reps" />
      <input name="weight" value={exercise.weight} onChange={handleChange} placeholder="Weight (kg)" />
      <input name="rest" value={exercise.rest} onChange={handleChange} placeholder="Rest (s)" />
      <input name="time" value={exercise.time} onChange={handleChange} placeholder="Time (min)" />
      <input name="distance" value={exercise.distance} onChange={handleChange} placeholder="Distance (km)" />
      <textarea name="note" value={exercise.note} onChange={handleChange} placeholder="Note" />

      <div>
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default ExerciseCreator;
