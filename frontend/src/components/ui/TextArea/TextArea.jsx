import './textarea.scss';

function TextArea({ name, id, value, onChange, rows, maxLength, className = '' }) {
  return (
    <div>
      <textarea
        name={`${name}`}
        id={`${id}`}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        placeholder={`${maxLength} characters max`}
        className={`textarea-base ${className}`}
      />
      <div className="char-counter">
        {value.length} / {maxLength}
      </div>
    </div>
  );
}

export default TextArea;
