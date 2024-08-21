import React from "react";
import Swal from "sweetalert2";
import { useCart } from "../stores/useCart";
import { useSession } from "../stores/useSession";
import "../styles/CartView.css";

const CartView = () => {
  const { items, updateItemQuantity, removeItem, clearCart } = useCart();
  const { tableNumber } = useSession();

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleOrder = () => {
    Swal.fire({
      title: "¡Éxito!",
      text: "Pedido realizado con éxito",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton: "swal-button",
      },
    }).then(() => {
      clearCart();
    });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto vaciará todo el carrito. Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar carrito",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "swal-button",
        cancelButton: "swal-button-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire({
          title: "¡Carrito vacío!",
          text: "El carrito ha sido vaciado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "swal-button",
          },
        });
      }
    });
  };

  if (items.length === 0) {
    return (
      <p className="text-center text-white mt-5">
        No hay productos en el carrito.
      </p>
    );
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
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="btn-quantity"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
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
                    onClick={() => removeItem(item.id)}
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

        <section className="text-center mt-4">
          <p className="status">
            Estado del pedido: <span className="waiting">En espera</span>
          </p>
        </section>
        <section className="text-center">
          <button onClick={handleOrder} className="btn-order">
            Realizar Pedido
          </button>
          <button onClick={handleClearCart} className="btn-clear">
            Vaciar Carrito
          </button>
        </section>
      </section>
    </>
  );
};

export default CartView;
