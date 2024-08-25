import { useOrders } from "../stores/useOrders";
import { useSession } from "../stores/useSession";
import UserInfoTable from "../components/MyAccountView/UserInfoTable";
import "../components/MyAccountView/MyAccountView.css";
import LocationMap from "../components/ui/Map/LocationMap";

const MyAccount = () => {
  const { orders } = useOrders();
  const { user, logout } = useSession();

  return (
    <>
      <section className="h1-orders">
        <h1>MI CUENTA</h1>
      </section>
      <UserInfoTable user={user} onLogout={logout} />
      <section>
        {orders.length === 0 ? (
          <p className="text-center text-white mt-5">
            No has realizado ningún pedido aún.
          </p>
        ) : (
          <>
            <article>
              <h2 className="text-center text-white mt-4">Mis pedidos</h2>
            </article>
            <article className="container mt-4">
              <div className="row">
                {/* {orders.map((order, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-4 col-sm-6 mb-4  d-flex justify-content-center"
                  >
                    <div className="card text-white bg-dark p-3 text-center h-100">
                      <p className="date">
                        Fecha: {order.date}
                        <br />
                        Número de mesa: {order.tableNumber}
                      </p>
                      <ul className="mt-4">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.name} | Cantidad: {item.quantity}
                            <br />
                            Precio: ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                      <p>
                        <span className="total">Total:</span> $
                        {order.items
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))} */}
              </div>
            </article>
          </>
        )}
      </section>
      <div className="container d-flex flex-column g-3 mt-5">
          <LocationMap />
        </div>
    </>
  );
};

export default MyAccount;
