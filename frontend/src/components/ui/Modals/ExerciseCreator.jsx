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
    if (mode === 'edit' && initialExerciseData) {
      setExercise(initialExerciseData); // ← garde bien le _id ici
    }
  }, [mode, initialExerciseData]);

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
      console.log('Données retournées par le PUT :', data);
      if (!res.ok) throw new Error(data.message);
      onUpdate(sessionId, data.updatedExercise, data.message);
      onRequestClose();
    } else {
      if (!sessionId) {
        console.error('Pas de sessionId fourni !');
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

        console.log('Exercice ajouté à la session !');
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
        console.error("Erreur lors de l'ajout de l'exercice à la session :", err.message);
      }
    }
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
