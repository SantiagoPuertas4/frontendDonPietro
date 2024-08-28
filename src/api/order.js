const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postOrderFn = async (data) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/order/`, {
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

export const deleteOrderFn = async (orderId) => {
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

export const getOrdersFn = async (type) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/order/${type}`, {
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

export const getPreparingOrdersTVFn = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/order/preparingordertv`, {
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

export const getPendingDeliveryOrderTVFn = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/order/pendingdeliverytv`, {
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

export const patchPendingOrderFn = async (orderId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/order/${orderId}/waiting`, {
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

export const patchPreparingOrderFn = async (orderId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${BACKEND_URL}/order/${orderId}/preparingorder`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Error al realizar el pedido");
  }

  const result = await response.json();
  return result;
};

export const patchPendingDeliveryOrderFn = async (orderId) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch(
    `${BACKEND_URL}/order/${orderId}/pendingdelivery`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Error al realizar el pedido");
  }

  const result = await response.json();
  return result;
};
