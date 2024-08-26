import { useState } from "react";

export const UserInfoTable = ({ user, onLogout }) => {
  return (
    <section className="account-info">
      <h2 className="text-center text-white mt-4">Información del Usuario</h2>
      <article className="table-responsive container mt-4">
        <table className="table table-dark table-striped text-center">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Nombre">{user.fullname}</td>
              <td data-label="Email">{user.email}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article className="text-center mt-2">
        <button className="close-button-class" onClick={onLogout}>
          Cerrar sesión
        </button>
      </article>
    </section>
  );
};

export default UserInfoTable;
