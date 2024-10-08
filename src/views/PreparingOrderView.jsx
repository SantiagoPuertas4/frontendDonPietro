import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getOrdersFn } from "../api/order";

import Modal from "../components/ui/Modal/Modal";
import PreparingOrderCard from "../components/PreparingOrder/PreparingOrderCard";

const PreparingOrderView = () => {
  const [details, setDetails] = useState();
  const [modal, setModal] = useState(false);
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["preparingOrders"],
    queryFn: () => getOrdersFn("PreparingOrder"),
  });

  const orderPlaceholder = () => {
    return (
      <section className="col-12 col-md-5 col-xl-3 m-1 pendingCard">
        <article className="m-1 p-2 d-flex flex-column justify-content-between gap-2 m-2  w-100">
          <h2 className="pendingTitle text-center placeholder-glow textPlaceholder w-100">
            <span className="placeholder col-12"></span>
          </h2>
          <div className="d-flex flex-column align-items-center gap-2 ">
            <p className="text-center placeholder-glow textPlaceholder w-100 mt-3">
              <span className="placeholder col-6">.</span>
            </p>
          </div>
          <div className="row gap-2 p-2">
            <button className="confirm-button-class placeholderButtonTV"></button>
            <button className="success-button-class placeholderButtonTV"></button>
          </div>
        </article>
      </section>
    );
  };

  if (isLoading) {
    return (
      <section className="m-5 row d-flex justify-content-center">
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
        {orderPlaceholder()}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="alert alert-danger mt-3 container">
        <p className="text-black text-center">
          Ocurrió un error cargando la lista de pedidos pendientes a preparar.
        </p>
      </section>
    );
  }

  if (orders && orders.data.length === 0) {
    return (
      <section className="text-center container mt-5">
        <p className="text-white">
          No se encontraron pedidos pendientes a preparar.
        </p>
      </section>
    );
  }

  return (
    <section className="m-5 row d-flex justify-content-center">
      {modal && <Modal details={details} setModal={setModal} />}
      {orders.data.map((order) => {
        return (
          <PreparingOrderCard
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
export default PreparingOrderView;
