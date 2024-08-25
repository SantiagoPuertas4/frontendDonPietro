import PropTypes from "prop-types";
import InvalidFeedback from "../InvalidFeedback/InvalidFeedback";

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
    select = false,
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
        <InvalidFeedback msg={errors?.message} />
      </fieldset>
    );
  }

  if (select) {
    return (
      <fieldset className={`form-floating ${ClassName}`}>
        <select
          className={`form-select ${inputClassName} ${
            errors ? "is-invalid" : ""
          }`}
          id={`${name}-input`}
          placeholder={placeholder}
          type={type}
          autoComplete={autocomplete}
          {...register(name, options)}
        >
          <option selected disabled>
            Seleccionar
          </option>
          <option value="comidas">Comidas</option>
          <option value="bebidas">Bebidas</option>
        </select>
        <label htmlFor={`${name}-input`} className={labelClassName}>
          {label}
        </label>
        <InvalidFeedback msg={errors?.message} />
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
      <InvalidFeedback msg={errors?.message} />
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
  select: PropTypes.bool,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  autocomplete: PropTypes.string,
};

export default Input;
