export const generarMesas = (num) => {
  const resultado = {};

  for (let i = 1; i <= num; i++) {
    resultado[i] = `Mesa ${i}`;
  }

  return resultado;
};
