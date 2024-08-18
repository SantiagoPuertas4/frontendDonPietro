import PropTypes from 'prop-types';

const ProductCard = (props) => {
  const { product } = props;

  return (
    <div className='card'>
      <img alt={product.name} className='card-img-top' src={product.imageUrl} />
      <div className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>{product.description}</p>
        <h6 className='card-subtitle mb-2 text-muted'>${product.price}</h6>
        <div className='text-end'>
          {product.stock > 0 ? (
            <button className='btn btn-primary'>
              Añadir al carrito
            </button>
          ) : (
            <p className='text-danger'>Sin stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};

export default ProductCard;
