import PropTypes from "prop-types";

const ProductRow = (props) => {
  const { product } = props;
  return (
    <article className="d-flex row cardUsuario my-2 px-3 py-1 align-items-center">
      <div className="col-12 col-md-6 col-xl-4">
        <img
          className="w-100 imgProductAdmin"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="col-8 col-md-4 col-xl-2 my-1 p-1">
        <p className="text-center">{product.name}</p>
      </div>
      <div className="col-4 col-md-2 col-xl-2 col-xxl-1 my-1">
        <p className="text-center">${product.price}</p>
      </div>

      <div className="col-12 col-xl-4 col-xxl-4 my-1 mb-2">
        <p className="text-center">{product.description}</p>
      </div>

      <div className="col-12 col-xxl-1 d-flex flex-xxl-column align-items-xxl-center justify-content-center my-1">
        <button className="ms-1 btn btnCustom w-100 mb-xxl-2">Editar</button>
        <button className="ms-1 btn btn-danger w-100 p-1">Eliminar</button>
      </div>
    </article>
  );
};
export default ProductRow;
ProductRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};
