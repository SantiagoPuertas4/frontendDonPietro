import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getPendingDeliveryOrderFn, getPreparingOrdersFn } from "../api/order";

import Orders from "../components/TVPanel/Orders";

import "../components/TVPanel/TVPanel.css";

const TVPanelView = () => {
  const [delivery, setDelivery] = useState({ data: [], message: "" });
  const [preparing, setPreparing] = useState({ data: [], message: "" });
  const {
    data: deliveryOrders,
    isLoading: loadingDelivery,
    isError: errorDelivery,
    isSuccess: successDelivery,
  } = useQuery({
    queryKey: ["deliveryOrders"],
    queryFn: () => getPendingDeliveryOrderFn(),
  });
  const {
    data: preparingOrders,
    isLoading: loadingPreparing,
    isError: errorPreparing,
    isSuccess: successPreparing,
  } = useQuery({
    queryKey: ["preparingOrders"],
    queryFn: () => getPreparingOrdersFn(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (deliveryOrders) {
        if (deliveryOrders !== delivery) {
          setDelivery(deliveryOrders);
        }
      }

      if (preparingOrders) {
        if (preparingOrders !== preparing) {
          setPreparing(preparingOrders);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [deliveryOrders, preparingOrders, delivery, preparing]);

  return (
    <>
      <section className="h1-pedidos">
        <h1>Pedidos</h1>
      </section>
      <section className="d-flex prueba py-5">
        <article className="w-50 d-flex flex-column text-center">
          <h5 className="text-white mb-3 state">Listos</h5>
          <Orders
            isLoading={loadingDelivery}
            isError={errorDelivery}
            order={delivery}
            isSuccess={successDelivery}
          />
        </article>

        <article className="w-50 text-center d-flex flex-column text-center">
          <h5 className="text-white mb-3 state">En proceso</h5>
          <Orders
            isLoading={loadingPreparing}
            isError={errorPreparing}
            order={preparing}
            isSuccess={successPreparing}
          />
        </article>
      </section>
    </>
  );
};

export default TVPanelView;
