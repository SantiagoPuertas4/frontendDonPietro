import { useQuery } from "@tanstack/react-query";

import { getUsersFn } from "../../api/users";

import UserRow from "./UserRow";

const UserList = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersFn(),
  });

  const placeholderCard = () => {
    return (
      <section className="d-flex row cardUsuario my-2 mx-1 py-1 align-items-center">
        <article className="col-6 col-md-3 col-xl-2 my-1">
          <p className="text-center placeholder textPlaceholder w-100"></p>
        </article>
        <article className="col-6 col-md-3 col-xl-2 my-1">
          <p className="text-center placeholder textPlaceholder w-100">Admin</p>
        </article>

        <article className="col-12 col-md-6 my-1 mb-2">
          <p className="text-center placeholder textPlaceholder w-100"></p>
        </article>

        <article className="col-12 col-xl-2 d-flex justify-content-center my-1">
          <button className="confirm-button-class p-xl-2 placeholder w-100"></button>

          <button className="ms-1 cancel-button-class placeholder w-100"></button>
        </article>
      </section>
    );
  };

  if (isLoading) {
    return (
      <section>
        <h1 className="titulo my-2 text-center">Usuarios registrados</h1>
        <article className="d-flex row justify-content-between">
          <div className="col-6 col-md-3 col-xl-2">
            <p className="userListTitle text-center">Nombre</p>
          </div>
          <div className="col-6 col-md-3 col-xl-2">
            <p className="userListTitle text-center">Tipo</p>
          </div>
          <div className="col-6 d-none d-md-block">
            <p className="userListTitle text-center">Email</p>
          </div>
          <div className="col-2 d-none d-xl-block">
            <p className="userListTitle text-center">Acciones</p>
          </div>
        </article>
        <article>
          <section className="d-flex row cardUsuario my-2 mx-1 py-1 align-items-center">
            <article className="col-6 col-md-3 col-xl-2 my-1">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>
            <article className="col-6 col-md-3 col-xl-2 my-1">
              <p className="text-center placeholder textPlaceholder w-100">
                Admin
              </p>
            </article>

            <article className="col-12 col-md-6 my-1 mb-2">
              <p className="text-center placeholder textPlaceholder w-100"></p>
            </article>

            <article className="col-12 col-xl-2 d-flex justify-content-center my-1"></article>
          </section>
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
          {placeholderCard()}
        </article>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="alert alert-danger mt-3">
        <p className="text-black">
          Ocurrio un error cargando la lista de usuarios
        </p>
      </section>
    );
  }

  if (users && users.data.length === 0) {
    return (
      <section className="text-white text-center mt-5">
        <p>No se encontraron usuarios para listar.</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="titulo my-2 text-center">Usuarios registrados</h1>
      <article className="d-flex row justify-content-between">
        <div className="col-6 col-md-3 col-xl-2">
          <p className="userListTitle text-center">Nombre</p>
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <p className="userListTitle text-center">Tipo</p>
        </div>
        <div className="col-6 d-none d-md-block">
          <p className="userListTitle text-center">Email</p>
        </div>
        <div className="col-2 d-none d-xl-block">
          <p className="userListTitle text-center">Acciones</p>
        </div>
      </article>
      <article>
        {users.data.map((user) => {
          return <UserRow key={user.id} user={user} />;
        })}
      </article>
    </section>
  );
};
export default UserList;
