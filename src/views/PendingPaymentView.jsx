import { useQuery } from "@tanstack/react-query";
import { getWaitingOrdersFn } from "../api/order";
import PendingPaymentCard from "../components/PendingPayment/PendingPaymentCard";
import "../components/PendingPayment/PendingPayment.css";
import { useState } from "react";
import ModalPending from "../components/ui/Modal/ModalPending";

const WaitingForPaymentView = () => {
  const [details, setDetails] = useState();
  const [modal, setModal] = useState(false);
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["waitingOrders"],
    queryFn: () => getWaitingOrdersFn(),
  });

  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-3 container">
        <p className="text-black">
          Ocurrio un error cargando la lista de pedidos pendientes a pagar
        </p>
      </div>
    );
  }

  if (orders && orders.data.length === 0) {
    return (
      <div className="alert alert-info mt-3 container">
        <p className="text-black text-center">
          No se encontraron pedidos pendientes a pagar
        </p>
      </div>
    );
  }

  return (
    <div className="m-5 row d-flex justify-content-center">
      {modal && <ModalPending details={details} setModal={setModal} />}
      {orders.data.map((order) => {
        return (
          <PendingPaymentCard
            key={order.id}
            order={order}
            setDetails={setDetails}
            setModal={setModal}
          />
        );
      })}
    </div>
  );
};
export default WaitingForPaymentView;
