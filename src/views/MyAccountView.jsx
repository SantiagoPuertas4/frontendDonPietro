import React from "react";
import { useOrders } from "../stores/useOrders";

const MyAccount = () => {
  const { orders } = useOrders();

  return (
    <div>
      <h2>Mis Pedidos</h2>
      {orders.length === 0 ? (
        <p>No has realizado ningún pedido aún.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Fecha: {order.date}</p>
              <p>Número de mesa: {order.tableNumber}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - Cantidad: {item.quantity} - Precio: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAccount;
