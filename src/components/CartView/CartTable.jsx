import React from 'react';

export const CartTable = ({ items, onQuantityChange, onRemoveItem }) => {
  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <section className="container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td data-label="Producto">{item.name}</td>
              <td data-label="Cantidad">
                <button
                  className="btn-quantity"
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="btn-quantity"
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </td>
              <td data-label="Precio">${item.price.toFixed(2)}</td>
              <td data-label="Total">
                ${(item.quantity * item.price).toFixed(2)}
              </td>
              <td data-label="Acciones">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="btn-remove"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total:</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default CartTable;
