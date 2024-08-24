import { useQuery } from "@tanstack/react-query";
import { getWaitingOrdersFn } from "../api/order";
import PendingPaymentCard from "../components/PendingPayment/PendingPaymentCard";
import { decodeJWT } from "../utilities/decodeJWT";

const WaitingForPaymentView = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: () => getWaitingOrdersFn(),
  });

  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-3">
        <p className="text-black">
          Ocurrio un error cargando la lista de pedidos pendientes a pagar
        </p>
      </div>
    );
  }

  if (orders && orders.data.length === 0) {
    return (
      <div className="alert alert-info mt-3">
        <p>No se encontraron pedidos pendientes a pagar</p>
      </div>
    );
  }

  return (
    <div>
      {orders.data.map((order) => {
        return <PendingPaymentCard key={order.id} order={order} />;
      })}
    </div>
  );
};
export default WaitingForPaymentView;
