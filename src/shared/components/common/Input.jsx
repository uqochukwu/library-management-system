const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && (
        <span className="form-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;