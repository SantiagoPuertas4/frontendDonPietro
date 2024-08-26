import PropTypes from "prop-types";

const InvalidFeedback = (props) => {
  const { msg, noInput, divClass, spanClass } = props;
  return (
    <div className={`invalid-feedback ${noInput ? "d-block" : ""} ${divClass}`}>
      <span
        className={`${spanClass} badge text-bg-danger text-wrap text-break`}
      >
        {msg}
      </span>
    </div>
  );
};
export default InvalidFeedback;
InvalidFeedback.propTypes = {
  msg: PropTypes.string,
  noInput: PropTypes.bool,
  divClass: PropTypes.string,
  spanClass: PropTypes.string,
};
