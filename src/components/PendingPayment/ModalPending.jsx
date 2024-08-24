import PropTypes from "prop-types";
import ModalRow from "./ModalRow";

const ModalPending = (props) => {
  const { details, setModal } = props;

  const handleClose = () => {
    setModal(false);
  };
  return (
    <div className="modal-overlay d-flex justify-content-center">
      <div className="modalNB d-block">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <section className="modal-content d-flex flex-column gap-3">
          <div>
            {details && (
              <h2 className="titulo">
                <b>{details.userName}</b>
              </h2>
            )}
          </div>
          <div>
            {details &&
              details.products.map((product) => {
                return <ModalRow key={product} product={product} />;
              })}
          </div>
          <div>
            {details && (
              <p className="titulo">
                Aclaraciones: sfdghdfghjdfgdfghdfghdfgh{details.comments}
              </p>
            )}
          </div>
          <div>
            {details && (
              <p className="titulo">
                TOTAL: <b>${details.total}</b>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
export default ModalPending;
const productShape = PropTypes.shape({
  product: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
});
ModalPending.propTypes = {
  details: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    comments: PropTypes.string,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(productShape).isRequired,
    total: PropTypes.number.isRequired,
  }),
  setModal: PropTypes.func.isRequired,
};
