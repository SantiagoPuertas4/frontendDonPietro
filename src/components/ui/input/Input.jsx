import PropTypes from "prop-types";

const Input = (props) => {
  const {
    name,
    type = "text",
    label,
    errors,
    ClassName = "",
    register,
    options,
    placeholder = "Ingrese un texto",
    textarea = false,
    labelClassName = "",
    inputClassName = "",
    autocomplete = "off",
  } = props;

  if (textarea) {
    return (
      <fieldset className={`form-floating ${ClassName}`}>
        <textarea
          className={`form-control ${inputClassName} ${
            errors ? "is-invalid" : ""
          }`}
          id={`${name}-input`}
          placeholder={placeholder}
          type={type}
          autoComplete={autocomplete}
          {...register(name, options)}
        />
        <label htmlFor={`${name}-input`} className={labelClassName}>
          {label}
        </label>
        <div className="invalid-feedback">
          <span className="badge text-bg-danger">{errors?.message}</span>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className={`form-floating ${ClassName}`}>
      <input
        className={`form-control ${inputClassName} ${
          errors ? "is-invalid" : ""
        }`}
        id={`${name}-input`}
        placeholder={placeholder}
        type={type}
        autoComplete={autocomplete}
        {...register(name, options)}
      />
      <label htmlFor={`${name}-input`} className={labelClassName}>
        {label}
      </label>
      <div className="invalid-feedback">
        <span className="badge text-bg-danger">{errors?.message}</span>
      </div>
    </fieldset>
  );
};

Input.displayName = `name`;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  ClassName: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  autocomplete: PropTypes.string,
};

export default Input;
