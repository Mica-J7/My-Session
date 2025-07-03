/*import React, { useState } from 'react';
import Modal from 'react-modal';

function ExerciseModal({ isOpen, onRequestClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    rest: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', sets: '', reps: '', weight: '', rest: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Exercise"
      style={{
        content: {
          maxWidth: '400px',
          margin: 'auto',
          inset: '40px',
          padding: '20px',
        },
      }}
    >
      <h2>Add Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required autoFocus />
        </label>
        <label>
          Sets:
          <input type="number" name="sets" value={formData.sets} onChange={handleChange} min="0" />
        </label>
        <label>
          Reps:
          <input type="number" name="reps" value={formData.reps} onChange={handleChange} min="0" />
        </label>
        <label>
          Weight:
          <input name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 80 or PDC" />
        </label>
        <label>
          Rest (sec):
          <input type="number" name="rest" value={formData.rest} onChange={handleChange} min="0" />
        </label>
        <div style={{ marginTop: '15px' }}>
          <button type="submit">Add</button>
          <button type="button" onClick={onRequestClose} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ExerciseModal;
/**/ /* */
