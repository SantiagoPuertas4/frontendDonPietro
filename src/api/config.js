const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getConfigFn = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/config/`, {
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
      resData.message || "Ocurrió un error leyendo la configuracion"
    );
  }

  return data;
};

export const postConfigFn = async (data) => {
  console.log(data);
  const token = sessionStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/config`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || "Error al cargar la configuracion"
    );
  }

  const result = await response.json();
  return result;
};
