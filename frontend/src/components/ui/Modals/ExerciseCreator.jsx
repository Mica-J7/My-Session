import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import MyTextareaComponent from '@/components/ui/TextArea/TextArea.jsx';
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
  const apiUrl = import.meta.env.VITE_API_URL;
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
      const res = await fetch(`${apiUrl}/api/exercises/${exercise._id}`, {
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
        const res = await fetch(`${apiUrl}/api/exercises/sessions/${sessionId}/exercises`, {
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        autoComplete="off"
        className="exercise-creator__form"
      >
        <div className="exercise-creator__form__group">
          <label htmlFor="name">Name :</label>
          <div className="input-wrapper">
            <input type="text" name="name" id="name" value={exercise.name} onChange={handleChange} />
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <label htmlFor="sets">Sets :</label>
          <div className="input-wrapper">
            <input type="text" name="sets" id="sets" value={exercise.sets} onChange={handleChange} />
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <label htmlFor="reps">Reps :</label>
          <div className="input-wrapper">
            <input type="text" name="reps" id="reps" value={exercise.reps} onChange={handleChange} />
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <label htmlFor="weight">Weight :</label>
          <div className="input-wrapper">
            <input type="text" name="weight" id="weight" value={exercise.weight} onChange={handleChange} />
            <span className="unit">kg</span>
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <label htmlFor="rest">Rest :</label>
          <div className="input-wrapper">
            <input type="text" name="rest" id="rest" value={exercise.rest} onChange={handleChange} />
            <span className="unit">s</span>
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <label htmlFor="time">Time :</label>
          <div className="input-wrapper">
            <input type="text" name="time" id="time" value={exercise.time} onChange={handleChange} />
            <span className="unit">min</span>
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <label htmlFor="distance">Distance :</label>
          <div className="input-wrapper">
            <input type="text" name="distance" id="distance" value={exercise.distance} onChange={handleChange} />
            <span className="unit">km</span>
          </div>
        </div>

        <div className="exercise-creator__form__group">
          <MyTextareaComponent value={exercise.note} onChange={handleChange} />
        </div>

        <div className="exercise-creator__form__btn">
          <button type="submit" className="exercise-creator__form__btn--ind">
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
