import PropTypes from "prop-types";

const PendingPaymentCard = (props) => {
  const { order, setDetails, setModal } = props;

  const handleDetails = () => {
    setDetails(order);
    setModal(true);
    console.log(order);
  };

  return (
    <article className="col-12 col-md-5 col-xl-3  m-1 pendingCard">
      <div className="m-1 p-2  d-flex flex-column justify-content-between gap-2 m-2">
        <h2 className="pendingTitle text-center">{order.userName}</h2>
        <section className="d-flex flex-column align-items-center gap-2 ">
          <p>
            TOTAL: <b>${order.total}</b>
          </p>
        </section>
        <section className="row gap-2">
          <button className="btn btn-danger">Eliminar</button>
          <button onClick={handleDetails} className="btn btnCustom">
            Detalles
          </button>
          <button className="btn btn-success">Pagado</button>
        </section>
      </div>
    </article>
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
  setModal: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
};
