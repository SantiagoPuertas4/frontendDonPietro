import PropTypes from "prop-types";

import InvalidFeedback from "../InvalidFeedback/InvalidFeedback";

const Checkbox = (props) => {
  const {
    label,
    name,
    register,
    checkClassName,
    className,
    errors,
    labelClassName = "",
    options,
    placeholder,
  } = props;
  return (
    <fieldset className={`form-check ${className}`}>
      <input
        className={`form-check-input ${checkClassName} ${
          errors ? "is-invalid" : ""
        }`}
        id={`${name}-input`}
        placeholder={placeholder}
        type="checkbox"
        {...register(name, options)}
      />
      <label
        htmlFor={`${name}-input`}
        className={`form-check-label ${labelClassName}`}
      >
        {label}
      </label>
      <InvalidFeedback msg={errors?.message} />
    </fieldset>
  );
};
export default Checkbox;
Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  checkClassName: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  labelClassName: PropTypes.string,
  options: PropTypes.object,
  placeholder: PropTypes.string,
};
