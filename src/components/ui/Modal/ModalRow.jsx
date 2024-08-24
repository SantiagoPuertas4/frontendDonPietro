import PropTypes from "prop-types";

const ModalRow = (props) => {
  const { product } = props;
  return (
    <tr className="row p-0 mb-0">
      <th className="col-3 p-0 maxWidthModalImg">
        <img
          className="w-100 h-100 object-fit-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </th>
      <td className="col-4 p-0 d-flex flex-column">
        <p className=" text-center h-100 text-break text-wrap">
          {product.name}
        </p>
      </td>
      <td className="col-3 p-0 d-flex flex-column">
        <p className="text-center h-100">${product.price}</p>
      </td>
      <td className="col-2 p-0 d-flex flex-column">
        <p className="text-center h-100">{product.quantity}</p>
      </td>
    </tr>
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
