import PropTypes from "prop-types";
import OrderRow from "./OrderRow";

const Orders = (props) => {
  const { isLoading, isError, isSuccess, order } = props;
  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <section className="text-center">
        <p className="text-white">
          Ocurrió un error cargando la lista de pedidos.
        </p>
      </section>
    );
  }

  if (order && order.data.length === 0) {
    return (
      <section className="text-center">
        <p className="text-white">
          No se encontraron pedidos.
        </p>
      </section>
    );
  }
  if (isSuccess) {
    return (
      <>
        {order.data.map((order) => {
          return <OrderRow key={order.id} order={order} />;
        })}
      </>
    );
  }
};
export default Orders;
const productPropType = PropTypes.shape({
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
});
const productsPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  product: productPropType.isRequired,
});
const orderPropType = PropTypes.shape({
  userName: PropTypes.string.isRequired,
  comments: PropTypes.string,
  paymentMethod: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product: productsPropType.isRequired,
    })
  ).isRequired,
});

Orders.propTypes = {
  order: PropTypes.shape({
    message: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        product: orderPropType,
        _id: PropTypes.string,
      })
    ).isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};
