import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getPendingDeliveryOrderFn } from "../api/order";

import Modal from "../components/ui/Modal/Modal";
import PendingDeliveryCard from "../components/PendingDelivery/PendingDeliveryCard";

const PendingDelivery = () => {
  const [details, setDetails] = useState();
  const [modal, setModal] = useState(false);
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveryOrders"],
    queryFn: () => getPendingDeliveryOrderFn(),
  });

  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <section className="text-center container mt-5">
        <p className="text-white">
          Ocurrió un error cargando la lista de pedidos pendientes a retirar.
        </p>
      </section>
    );
  }

  if (orders && orders.data.length === 0) {
    return (
      <section className="text-center container mt-5">
        <p className="text-white text-center">
          No se encontraron pedidos pendientes a retirar.
        </p>
      </section>
    );
  }

  return (
    <section className="m-5 row d-flex justify-content-center">
      {modal && <Modal details={details} setModal={setModal} />}
      {orders.data.map((order) => {
        return (
          <PendingDeliveryCard
            key={order.id}
            order={order}
            setDetails={setDetails}
            setModal={setModal}
          />
        );
      })}
    </section>
  );
};
export default PendingDelivery;
