import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPendingDeliveryOrderFn, getPreparingOrdersFn } from "../api/order";

const TVPanel = () => {
  const [preparing, setPreparing] = useState();
  const [delivery, setDelivery] = useState();
  const {
    data: deliveryOrders,
    isLoading: loadingDelivery,
    isError: errorDelivery,
  } = useQuery({
    queryKey: ["deliveryOrders"],
    queryFn: () => getPendingDeliveryOrderFn(),
  });
  const {
    data: preparingOrders,
    isLoading: loadingPreparing,
    isError: errorPreparing,
  } = useQuery({
    queryKey: ["preparingOrders"],
    queryFn: () => getPreparingOrdersFn(),
  });

  return <div>TVPanel</div>;
};
export default TVPanel;
