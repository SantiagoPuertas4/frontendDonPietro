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

  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-3">
        <p className="text-black">
          Ocurrio un error cargando la lista de usuarios
        </p>
      </div>
    );
  }

  if (users && users.data.length === 0) {
    return (
      <div className="alert alert-info mt-3">
        <p>No se encontraron usuarios para listar</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="titulo my-2 text-center">Usuarios registrados</h1>
      <div className="d-flex row justify-content-between">
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
      </div>
      <div>
        {users.data.map((user) => {
          return <UserRow key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};
export default UserList;
