import PropTypes from "prop-types";
const OrderRow = (props) => {
  const { order } = props;

  return (
    <article className="my-3">
      <h1 className="text-white">{order.userName}</h1>
    </article>
  );
};
export default OrderRow;

const productsPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    isGlutenFree: PropTypes.bool.isRequired,
    isVegan: PropTypes.bool.isRequired,
    isVegetarian: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
});
OrderRow.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        product: productsPropType.isRequired,
      })
    ).isRequired,
  }),
};
