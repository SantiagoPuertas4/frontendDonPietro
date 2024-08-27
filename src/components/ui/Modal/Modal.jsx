import PropTypes from "prop-types";
import ModalRow from "./ModalRow";

import "./Modal.css";
import { useEffect } from "react";
import { useRef } from "react";

const Modal = (props) => {
  const { details, setModal } = props;
  const modalRef = useRef(null);

  const handleClose = () => {
    setModal(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="modal-overlay d-flex justify-content-center">
      <article ref={modalRef} className="modalNB d-block">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <div className="modal-content d-flex flex-column gap-3">
          <div>
            {details && (
              <h2 className="titulo text-center">
                <b>{details.userName}</b>
              </h2>
            )}
          </div>
          <table className="table table-bordered table-dark w-100">
            <thead className="d-block">
              <tr className="row p-0">
                <th className="col-3 w-1 p-0">
                  <p className="text-center">Imagen</p>
                </th>
                <th className="col-4 p-0">
                  <p className="text-center">Nombre</p>
                </th>
                <th className="col-3 p-0">
                  <p className="text-center">Precio</p>
                </th>
                <th className="col-2 p-0">
                  <p className="text-center">#</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {details &&
                details.products.map((item) => {
                  return (
                    <ModalRow key={item.product.id} product={item.product} />
                  );
                })}
              <tr className="row p-0 mb-0">
                <th className="col-3 p-0"></th>
                <td className="col-4 p-0 d-flex flex-column">
                  <p className=" text-center h-100 text-break text-wrap">
                    <b>TOTAL</b>
                  </p>
                </td>
                <td className="col-3 p-0 d-flex flex-column">
                  <p className="text-center h-100">
                    <b>${details.total}</b>
                  </p>
                </td>
                <td className="col-2 p-0 d-flex flex-column">
                  <p className="text-center h-100"></p>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            {details.comments && (
              <p className="text-break text-wrap">
                <b>Comentarios:</b> {details.comments}
              </p>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
export default Modal;
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

Modal.propTypes = {
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
