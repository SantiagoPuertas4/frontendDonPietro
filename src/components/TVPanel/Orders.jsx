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
        <p className="text-white">No se encontraron pedidos.</p>
      </section>
    );
  }
  if (isSuccess) {
    console.log(order);
    return (
      <>
        {order.data.map((order, index) => {
          return <OrderRow key={index} order={order} />;
        })}
      </>
    );
  }
};
export default Orders;

Orders.propTypes = {
  order: PropTypes.shape({
    message: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string,
        _id: PropTypes.string,
      })
    ).isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};
