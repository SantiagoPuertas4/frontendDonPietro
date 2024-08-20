import PropTypes from 'prop-types';

const ProductCard = (props) => {
  const { product } = props;

  return (
    <section className='card text-center'>
      <img alt={product.name} className='card-img-top' src={product.imageUrl} />
      <article className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>{product.description}</p>
        <h6 className='card-price mb-2'>${product.price}</h6>
        <div>
          {product.stock > 0 ? (
            <button className='order-button'>
              Añadir
            </button>
          ) : (
            <p className='text-danger'>Sin stock</p>
          )}
        </div>
      </article>
    </section>
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
