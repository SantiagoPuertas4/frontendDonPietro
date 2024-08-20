const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsersFn = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Ocurrio un error cargando la lista de usuarios");
  }

  return data;
};

export const deleteUserFn = async (userId) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      "Ocurrio un error intentando eliminar al usuario seleccionado"
    );
  }
};

export const toggleUserFn = async (userId) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BACKEND_URL}/users/${userId}/toggle-admin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      "Ocurrio un error intentando cambiar el tipo de cuenta al usuario seleccionado"
    );
  }
};
