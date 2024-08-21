import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCart } from '../../stores/useCart';
import Swal from 'sweetalert2';

const ProductCard = (props) => {
  const { product } = props;
  const { addToCart, getCartItem } = useCart();
  const [localStock, setLocalStock] = useState(product.stock - (getCartItem(product.id)?.quantity || 0));

  const handleAddToCart = () => {
    if (localStock > 0) {
      addToCart(product);
      setLocalStock(localStock - 1);
      
      Swal.fire({
        title: 'Producto añadido',
        text: `${product.name} se ha añadido a tu carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <section className='card text-center'>
      <img alt={product.name} className='card-img-top' src={product.imageUrl} />
      <article className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>{product.description}</p>
        <h6 className='card-price mb-2'>${product.price}</h6>
        <div>
          {localStock > 0 ? (
            <button className='order-button' onClick={handleAddToCart}>
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
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};

export default ProductCard;
