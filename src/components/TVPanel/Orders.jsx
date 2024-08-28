import PropTypes from "prop-types";

import OrderRow from "./OrderRow";

const Orders = (props) => {
  const { loadingInterval, isLoading, isError, isSuccess, order } = props;

  const placeholderPanel = () => {
    return (
      <p className="my-3 placeholder-glow textPlaceholder mx-3">
        <span className="placeholder col-12">Cargando datos...</span>
      </p>
    );
  };

  if (loadingInterval === false) {
    return (
      <div>
        {placeholderPanel()}
        {placeholderPanel()}
        {placeholderPanel()}
        {placeholderPanel()}
        {placeholderPanel()}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        {placeholderPanel()}
        {placeholderPanel()}
        {placeholderPanel()}
        {placeholderPanel()}
        {placeholderPanel()}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-3 state">
        <p className="text-black">
          Ocurrió un error cargando la lista de pedidos.
        </p>
      </div>
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
  loadingInterval: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};
