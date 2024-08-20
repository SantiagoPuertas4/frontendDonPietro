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
    throw new Error("Ocurrió un error guardando el producto");
  }
};

export const getProductsFn = async () => {
  const res = await fetch(`${BACKEND_URL}/products`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Ocurrió un error leyendo los productos");
  }

  return data;
};

export const getProductByIdFn = async (productId) => {
  const res = await fetch(`${BACKEND_URL}/products/${productId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Ocurrió un error leyendo el producto seleccionado");
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
    throw new Error(
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
    throw new Error(
      "Ocurrió un error intentando editar el producto seleccionado"
    );
  }
};
