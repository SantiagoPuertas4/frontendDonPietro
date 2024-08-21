import { decodeJWT } from '../utilities/decodeJWT';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postLoginFn = async (data) => {
  // data: { username, password }

  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || 'Ocurrió un error');
  }

  const token = resData.data;

  if (!token) {
    throw new Error(resData.message || 'Ocurrió un error');
  }

  const userData = decodeJWT(token).user;

  // Persistir el JWT
  sessionStorage.setItem('token', token);

  return userData;
};

export const postRegisterFn = async (data) => {
  console.log(data);
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Ocurrió un error guardando el usuario');
  }

};
