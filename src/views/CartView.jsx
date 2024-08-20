import React from 'react';
import { useCart } from '../stores/useCart';

const CartView = () => {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
};

export default CartView;