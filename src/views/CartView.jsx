import React from "react";
import { useCart } from "../stores/useCart";
import { useSession } from "../stores/useSession";
import '../styles/CartView.css'

const CartView = () => {
  const { items, clearCart } = useCart();
  const { tableNumber } = useSession();

  const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  if (items.length === 0) {
    return <p className="text-center text-white mt-5">No hay productos en el carrito.</p>;
  }

  return (
    <>
      <section className="h1-cart">
        <h1>CARRITO</h1>
      </section>
      <section>
        <h2 className="mt-3 text-center text-white">Gestioná tu pedido</h2>
        {tableNumber && (
          <h5 className="text-center text-white mt-3">
            Número de mesa: {tableNumber}
          </h5>
        )}
      </section>
      <section className="container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total:</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button onClick={clearCart} className="btn-clear-cart">Vaciar Carrito</button>
      </section>
    </>
  );
};

export default CartView;
