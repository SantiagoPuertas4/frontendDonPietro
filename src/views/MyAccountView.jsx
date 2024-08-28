import { useSession } from "../stores/useSession";
import { useQuery } from "@tanstack/react-query";

import { getOrdersHistorialFn } from "../api/order";

import UserInfoTable from "../components/MyAccountView/UserInfoTable";
import LocationMap from "../components/ui/Map/LocationMap";

import "../components/MyAccountView/MyAccountView.css";

const MyAccountView = () => {
  const { logout } = useSession();

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["waitingOrders"],
    queryFn: () => getOrdersHistorialFn(),
  });

  const placeholderHistorial = () => {
    return (
      <div className="order-item">
        <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
          <strong>Estado: </strong>
          <span className="placeholder col-6">.</span>
        </p>
        <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
          <strong>Método de pago: </strong>
          <span className="placeholder col-6">.</span>
        </p>
        <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
          <strong>Mesa: </strong>
          <span className="placeholder col-6">.</span>
        </p>
        <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
          <strong>Fecha: </strong>
          <span className="placeholder col-6">.</span>
        </p>
        <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
          <strong>Comentarios: </strong>
          <span className="placeholder col-6">.</span>
        </p>
        <h3 className="order mt-4">Pedido:</h3>
        <ul>
          <li>
            <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
              <strong>Producto: </strong>
              <span className="placeholder col-6">.</span>
            </p>
            <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
              <strong>Cantidad: </strong>
              <span className="placeholder col-6">.</span>
            </p>
            <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
              <strong>Precio: </strong>
              <span className="placeholder col-6">.</span>
            </p>
          </li>
        </ul>
        <h4 className="text-white">
          <p className="text-start placeholder-glow textPlaceholder w-100 mt-3">
            <strong>Total: </strong>
            <span className="placeholder col-6">.</span>
          </p>
        </h4>
      </div>
    );
  };

  if (isLoading)
    return (
      <>
        <section className="h1-orders">
          <h1>MI CUENTA</h1>
        </section>
        <UserInfoTable onLogout={logout} />
        <section className="order-container">
          <h2 className="text-center text-white mt-4 mb-4">
            Historial de pedidos
          </h2>
          <article className="orders-grid">
            {placeholderHistorial()}
            {placeholderHistorial()}
            {placeholderHistorial()}
          </article>
        </section>
      </>
    );

  if (isError)
    return (
      <>
        <section className="h1-orders">
          <h1>MI CUENTA</h1>
        </section>
        <UserInfoTable onLogout={logout} />
        <section className="order-container">
          <h2 className="text-center text-white mt-4 mb-4">
            Historial de pedidos
          </h2>
          <section className="alert alert-danger mt-3 container">
            <p className="text-black text-center">
              Ocurrió un error cargando la lista de pedidos pendientes a
              preparar.
            </p>
          </section>
        </section>
      </>
    );

  return (
    <>
      <section className="h1-orders">
        <h1>MI CUENTA</h1>
      </section>
      <UserInfoTable onLogout={logout} />
      <section className="order-container">
        <h2 className="text-center text-white mt-4 mb-4">
          Historial de pedidos
        </h2>

        {orders.data.length === 0 ? (
          <p className="text-center text-white">No se encontraron pedidos.</p>
        ) : (
          <article className="orders-grid">
            {orders.data.map((order) => (
              <div key={order.id} className="order-item">
                <p>
                  <strong>Estado:</strong> {order.status}
                </p>
                <p>
                  <strong>Método de pago:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Mesa:</strong> {order.table}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Comentarios:</strong>{" "}
                  {order.comments || "Sin comentarios."}
                </p>

                <h3 className="order mt-4">Pedido:</h3>
                <ul>
                  {order.products.map((item, index) => (
                    <li key={index}>
                      <p>
                        <strong>Producto:</strong> {item.product.name}
                      </p>
                      <p>
                        <strong>Cantidad:</strong>{" "}
                        {item.product.quantity || "N/A"}
                      </p>
                      <p>
                        <strong>Precio:</strong> ${item.product.price}.00
                      </p>
                    </li>
                  ))}
                </ul>
                <h4 className="text-white">
                  <strong>Total:</strong> ${order.total}.00
                </h4>
              </div>
            ))}
          </article>
        )}
      </section>
      <section className="container d-flex flex-column g-3 mt-5">
        <LocationMap />
      </section>
    </>
  );
};

export default MyAccountView;
