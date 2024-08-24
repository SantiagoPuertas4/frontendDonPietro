const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postOrderFn = async (data) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/order/hand`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Error al realizar el pedido");
  }

  const result = await response.json();
  return result;
};

export const getWaitingOrdersFn = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/order/waiting`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    const resData = await res.json();
    throw new Error(
      resData.message || "Ocurrió un error leyendo los productos"
    );
  }

  return data;
};

export const deleteOrderFn = async (orderId) => {
  console.log(orderId);
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${BACKEND_URL}/order/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const resData = await res.json();
    throw new Error(
      resData.message ||
        "Ocurrió un error intentando eliminar la orden seleccionada"
    );
  }
};

export const patchPendingOrderFn = async (orderId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/order/${orderId}/preparing`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Error al realizar el pedido");
  }

  const result = await response.json();
  return result;
};
