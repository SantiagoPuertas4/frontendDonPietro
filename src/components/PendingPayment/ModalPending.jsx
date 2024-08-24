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
              <h2 className="titulo text-center">
                <b>{details.userName}</b>
              </h2>
            )}
          </div>
          <div className="w-100">
            <div className="row p-0 my-2">
              <div className="col-3 d-flex justify-content-center p-0">
                <p>Imagen</p>
              </div>
              <div className="col-4 d-flex justify-content-center p-0">
                <p>Nombre</p>
              </div>
              <div className="col-3 d-flex justify-content-center p-0">
                <p>Precio</p>
              </div>
              <div className="col-2 d-flex justify-content-center p-0">
                <p>#</p>
              </div>
            </div>
            {details &&
              details.products.map((item) => {
                return (
                  <ModalRow key={item.product.id} product={item.product} />
                );
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

ModalPending.propTypes = {
  details: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    comments: PropTypes.string,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        product: productPropType.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
  }),
  setModal: PropTypes.func.isRequired,
};
