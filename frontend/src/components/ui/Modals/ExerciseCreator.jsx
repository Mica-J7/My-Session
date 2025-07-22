import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import './exercise-creator.scss';

function ExerciseCreator({
  isOpen,
  onRequestClose,
  onCreate,
  onUpdate,
  sessionId,
  mode = 'create',
  initialExerciseData = null,
}) {
  const isEditing = mode === 'edit' && initialExerciseData;

  const [exercise, setExercise] = useState(
    initialExerciseData || {
      name: '',
      sets: '',
      reps: '',
      weight: '',
      rest: '',
      time: '',
      distance: '',
      note: '',
    },
  );

  useEffect(() => {
    if (isEditing && initialExerciseData) {
      setExercise({
        _id: initialExerciseData._id,
        name: initialExerciseData.name ?? '',
        sets: initialExerciseData.sets ?? '',
        reps: initialExerciseData.reps ?? '',
        weight: initialExerciseData.weight ?? '',
        rest: initialExerciseData.rest ?? '',
        time: initialExerciseData.time ?? '',
        distance: initialExerciseData.distance ?? '',
        note: initialExerciseData.note ?? '',
      });
    }
  }, [isEditing, initialExerciseData]);

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

  const handleSubmit = async () => {
    if (mode === 'edit') {
      const res = await fetch(`http://localhost:3000/api/exercises/${exercise._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(exercise),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onUpdate(sessionId, data.updatedExercise, data.message);
      onRequestClose();
      console.log('Exercise updated');
    } else {
      if (!sessionId) {
        console.error('sessionId not provided.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/exercises/sessions/${sessionId}/exercises`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(exercise),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        console.log('Exercise added to session');
        onCreate(sessionId, data.exercise);
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
      } catch (err) {
        console.error('Failed to add exercise :', err.message);
        onRequestClose();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add an erxercise"
      className="exercise-creator"
      overlayClassName="exercise-creator__overlay"
    >
      <h2>{isEditing ? 'Edit Exercise :' : 'Add Exercise :'}</h2>

      <form className="exercise-creator__form">
        <input
          name="name"
          value={exercise.name}
          onChange={handleChange}
          placeholder="Name"
          className="exercise-creator__form__group"
        />
        <input
          name="sets"
          value={exercise.sets}
          onChange={handleChange}
          placeholder="Sets"
          className="exercise-creator__form__group"
        />
        <input
          name="reps"
          value={exercise.reps}
          onChange={handleChange}
          placeholder="Reps"
          className="exercise-creator__form__group"
        />
        <input
          name="weight"
          value={exercise.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="exercise-creator__form__group"
        />
        <input
          name="rest"
          value={exercise.rest}
          onChange={handleChange}
          placeholder="Rest (s)"
          className="exercise-creator__form__group"
        />
        <input
          name="time"
          value={exercise.time}
          onChange={handleChange}
          placeholder="Time (min)"
          className="exercise-creator__form__group"
        />
        <input
          name="distance"
          value={exercise.distance}
          onChange={handleChange}
          placeholder="Distance (km)"
          className="exercise-creator__form__group"
        />
        <textarea
          name="note"
          value={exercise.note}
          onChange={handleChange}
          placeholder="Note"
          className="exercise-creator__form__group"
        />

        <div className="exercise-creator__form__btn">
          <button className="exercise-creator__form__btn--ind" onClick={handleSubmit}>
            {isEditing ? 'Edit' : 'Add'}
          </button>
          <button className="exercise-creator__form__btn--ind" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ExerciseCreator;
