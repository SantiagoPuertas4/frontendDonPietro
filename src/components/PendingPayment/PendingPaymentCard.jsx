import PropTypes from "prop-types";
const PendingPaymentCard = (props) => {
  const { order } = props;
  console.log(order);
  return (
    <div className="col-3">
      <div className="card">
        <h1>{order.userName}</h1>
        <div></div>
      </div>
    </div>
  );
};
export default PendingPaymentCard;

const productShape = PropTypes.shape({
  product: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
});

PendingPaymentCard.propTypes = {
  order: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    comments: PropTypes.string,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(productShape).isRequired,
    total: PropTypes.number.isRequired,
  }),
};
