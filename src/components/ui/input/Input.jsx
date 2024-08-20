import PropTypes from "prop-types";

const Input = (props) => {
  const {
    name,
    type = "text",
    label,
    error,
    fieldClassName = "",
    register,
    options,
    placeholder = "Ingrese un texto",
    textarea = false,
    labelClassName = "",
    inputClassName = "",
  } = props;

  if (textarea) {
    return (
      <fieldset className={`form-floating ${fieldClassName}`}>
        <textarea
          className={`form-control ${inputClassName} ${
            error ? "is-invalid" : ""
          }`}
          id={`${name}-input`}
          placeholder={placeholder}
          type={type}
          {...register(name, options)}
        />
        <label htmlFor={`${name}-input`} className={labelClassName}>
          {label}
        </label>
        <div className="invalid-feedback">
          <span className="badge text-bg-danger">{error?.message}</span>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className={`form-floating ${fieldClassName}`}>
      <input
        className={`form-control ${inputClassName} ${
          error ? "is-invalid" : ""
        }`}
        id={`${name}-input`}
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
      />
      <label htmlFor={`${name}-input`} className={labelClassName}>
        {label}
      </label>
      <div className="invalid-feedback">
        <span className="badge text-bg-danger">{error?.message}</span>
      </div>
    </fieldset>
  );
};

Input.displayName = `name`;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  fieldClassName: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default Input;
