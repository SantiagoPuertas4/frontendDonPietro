import PropTypes from "prop-types";

const ModalRow = (props) => {
  const { product } = props;
  return (
    <div className="row p-0 my-2">
      <div className="col-3 p-0">
        <img
          className="w-100 object-fit-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="col-4">
        <p className=" text-center text-break text-wrap">{product.name}</p>
      </div>
      <div className="col-3 p-0">
        <p className="text-center">{product.price}</p>
      </div>
      <div className="col-2 p-0">
        <p className="text-center">{product.quantity}</p>
      </div>
    </div>
  );
};
export default ModalRow;
ModalRow.propTypes = {
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
};
