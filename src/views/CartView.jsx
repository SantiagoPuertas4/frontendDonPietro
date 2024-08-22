import React from "react";
import Swal from "sweetalert2";
import { useCart } from "../stores/useCart";
import { useSession } from "../stores/useSession";
import { useOrders } from "../stores/useOrders"; // Importamos el store de pedidos
import "../components/CartView/CartView.css";
import { CartTable } from "../components/CartView/CartTable";

const CartView = () => {
  const { items, updateItemQuantity, removeItem, clearCart } = useCart();
  const { tableNumber } = useSession();
  const { addOrder } = useOrders(); // Obtenemos la función para añadir pedidos

  const handleOrder = () => {
    const order = {
      items,
      tableNumber,
      date: new Date().toLocaleString(),
    };

    addOrder(order); // Guardamos el pedido en el store

    Swal.fire({
      title: "¡Éxito!",
      text: "Pedido realizado con éxito",
      icon: "success",
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton: "swal-button",
      },
    }).then(() => {
      items.forEach((item) => {
        const storedStock = parseInt(sessionStorage.getItem(`stock_${item.id}`), 10);
        if (!isNaN(storedStock)) {
          const newStock = storedStock - item.quantity;
          sessionStorage.setItem(`stock_${item.id}`, newStock);
        }
      });
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
        items.forEach((item) => {
          const storedStock = parseInt(sessionStorage.getItem(`stock_${item.id}`), 10);
          if (!isNaN(storedStock)) {
            const restoredStock = storedStock + item.quantity;
            sessionStorage.setItem(`stock_${item.id}`, restoredStock);
          }
        });
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
      <CartTable
        items={items}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={removeItem}
      />
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
    </>
  );
};

export default CartView;
