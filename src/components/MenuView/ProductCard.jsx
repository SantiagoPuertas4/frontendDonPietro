import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useCart } from "../../stores/useCart";
import Swal from "sweetalert2";

const ProductCard = (props) => {
  const { product } = props;
  const { addToCart, getCartItem } = useCart();
  const [localStock, setLocalStock] = useState(() => {
    const storedStock = parseInt(
      sessionStorage.getItem(`stock_${product.id}`),
      10
    );
    return storedStock - (getCartItem(product.id)?.quantity || 0);
  });

  useEffect(() => {
    const storedStock = parseInt(
      sessionStorage.getItem(`stock_${product.id}`),
      10
    );
    setLocalStock(storedStock - (getCartItem(product.id)?.quantity || 0));
  }, [getCartItem(product.id)]);

  const handleAddToCart = () => {
    const cartItem = getCartItem(product.id);
    const availableStock = parseInt(
      sessionStorage.getItem(`stock_${product.id}`),
      10
    );
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    if (availableStock > currentQuantity) {
      addToCart(product);
      setLocalStock(availableStock - (currentQuantity + 1));

      Swal.fire({
        title: "Producto añadido",
        text: `${product.name} se ha añadido a tu carrito.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Sin stock",
        text: "No hay suficiente stock para añadir más unidades.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <section className="card text-center h-100">
      <img alt={product.name} className="card-img-top" src={product.imageUrl} />
      <article className="card-body p-0 d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title px-1">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <h6 className="card-price mb-2">${product.price}</h6>
        </div>
        <div className="mb-4">
          {localStock > 0 ? (
            <button className="order-button" onClick={handleAddToCart}>
              Añadir
            </button>
          ) : (
            <p className="text-danger">Sin stock</p>
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
