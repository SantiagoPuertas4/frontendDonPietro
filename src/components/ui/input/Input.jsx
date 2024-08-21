import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    name,
    type = 'text',
    label,
    error,
    className = '',
    register,
    options,
    placeholder = 'Ingrese un texto',
    textarea = false,
    inputClassName = '',
    labelClasseName = '',
  } = props;

  if (textarea) {
    return (
      <fieldset className={`form-floating ${className}`}>
        <textarea
          className={`form-control ${inputClassName} ${error ? 'is-invalid' : ''}`}
          id={`${name}-input`}
          placeholder={placeholder}
          type={type}
          {...register(name, options)}
        />
        <label htmlFor={`${name}-input`} className={labelClasseName}>{label}</label>
        <div className='invalid-feedback'>
          <span className='badge text-bg-danger'>{error?.message}</span>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className={`form-floating ${className}`}>
      <input
        className={`form-control ${inputClassName} ${error ? 'is-invalid' : ''}`}
        id={`${name}-input`}
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
      />
       <label htmlFor={`${name}-input`} className={labelClasseName}>{label}</label>
      <div className='invalid-feedback'>
        <span className='badge text-bg-danger'>{error?.message}</span>
      </div>
    </fieldset>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  className: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClasseName: PropTypes.string,
};

export default Input;
