const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postProductsFn = async (data) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${BACKEND_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const resData = await res.json();
    throw new Error(
      resData.message || "Ocurrió un error guardando el producto"
    );
  }
};

export const getProductsFn = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/products`, {
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

export const getProductByIdFn = async (productId) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
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
      resData.message || "Ocurrió un error leyendo el producto seleccionado"
    );
  }

  return data;
};

export const deleteProductsFn = async (productId) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const resData = await res.json();
    throw new Error(
      resData.message ||
        "Ocurrió un error intentando eliminar el producto seleccionado"
    );
  }
};

export const putProductsFn = async ({ productId, data }) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const resData = await res.json();
    throw new Error(
      resData.message ||
        "Ocurrió un error intentando editar el producto seleccionado"
    );
  }
};
