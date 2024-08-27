import PropTypes from "prop-types";
const OrderRow = (props) => {
  const { order } = props;

  return (
    <article className="my-2">
      <h5 className="text-white name">{order.userName}</h5>
    </article>
  );
};
export default OrderRow;

OrderRow.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }),
};
