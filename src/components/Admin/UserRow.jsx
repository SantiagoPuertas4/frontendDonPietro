import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { deleteUserFn, toggleUserFn } from "../../api/users";
import { toast } from "sonner";
import Swal from "sweetalert2";

const UserRow = (props) => {
  const { user } = props;
  const QueryClient = useQueryClient();

  const { mutate: deleteUser } = useMutation({
    mutationFn: deleteUserFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Usuario eliminado");

      QueryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const { mutate: toggleUser } = useMutation({
    mutationFn: toggleUserFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Se cambio el tipo de usuario");

      QueryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleDelete = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      html: `¿Estas seguro que deseas eliminar al usuario <b>${user.username}</b>?`,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando usuario ...");
      deleteUser(user.id);
    }
  };

  const handleToggle = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      html: `¿Estas seguro que deseas cambiar el tipo de cuenta del usuario <b>${user.username}</b>?`,
      confirmButtonText: "Si, cambiar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando usuario ...");
      toggleUser(user.id);
    }
  };

  return (
    <article className="d-flex row cardUsuario my-2 mx-1 py-1 align-items-center">
      <div className="col-6 col-md-3 col-xl-2 my-1">
        <p className="text-center">{user.fullname}</p>
      </div>
      <div className="col-6 col-md-3 col-xl-2 my-1">
        {user.isAdmin ? (
          <p className="text-center">Admin</p>
        ) : (
          <p className="text-center">Usuario</p>
        )}
      </div>

      <div className="col-12 col-md-6 my-1 mb-2">
        <p className="text-center">{user.email}</p>
      </div>

      <div className="col-12 col-xl-2 d-flex justify-content-center my-1">
        {user.isAdmin ? (
          <button onClick={handleToggle} className="btn btnCustom p-xl-2">
            Cambiar a Usuario
          </button>
        ) : (
          <button onClick={handleToggle} className="btn btnCustom p-xl-2">
            Cambiar a Admin
          </button>
        )}

        <button onClick={handleDelete} className="ms-1 btn btn-danger">
          Eliminar
        </button>
      </div>
    </article>
  );
};
export default UserRow;
UserRow.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }),
};
