import './textarea.scss';

function MyTextareaComponent({ value, onChange }) {
  const maxLength = 60;

  return (
    <div className="wrapper">
      <label htmlFor="note">Note :</label>
      <div>
        <textarea
          name="note"
          id="note"
          value={value}
          onChange={onChange}
          rows={3}
          style={{ resize: 'none' }}
          maxLength={60}
          placeholder="60 characters max"
        />
        <div className="char-counter">
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  );
}

export default MyTextareaComponent;
