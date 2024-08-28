import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUserFn, toggleUserFn } from "../../api/users";

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
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
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
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    },
  });

  const showButton = !user.superAdmin;

  const handleDelete = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      html: `¿Estas seguro que deseas eliminar al usuario <b>${user.fullname}</b>?`,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal-button",
        cancelButton: "swal-button-cancel",
      },
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando usuario ...");
      deleteUser(user.id);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  };

  const handleToggle = async () => {
    const action = await Swal.fire({
      title: "Atención",
      icon: "info",
      html: `¿Estás seguro que deseas cambiar el tipo de cuenta del usuario <b>${user.fullname}</b>?`,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando usuario ...");
      toggleUser(user.id);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    }
  };

  return (
    <section className="d-flex row cardUsuario my-2 mx-1 py-1 align-items-center">
      <article className="col-6 col-md-3 col-xl-2 my-1">
        <p className="text-center">{user.fullname}</p>
      </article>
      <article className="col-6 col-md-3 col-xl-2 my-1">
        {user.isAdmin ? (
          <p className="text-center">Admin</p>
        ) : (
          <p className="text-center">Usuario</p>
        )}
      </article>

      <article className="col-12 col-md-6 my-1 mb-2">
        <p className="text-center">{user.email}</p>
      </article>

      <article className="col-12 col-xl-2 d-flex justify-content-center my-1">
        {showButton &&
          (user.isAdmin ? (
            <button
              onClick={handleToggle}
              className="confirm-button-class p-xl-2"
            >
              Cambiar a Usuario
            </button>
          ) : (
            <button
              onClick={handleToggle}
              className="confirm-button-class p-xl-2"
            >
              Cambiar a Admin
            </button>
          ))}

        <button onClick={handleDelete} className="ms-1 cancel-button-class">
          Eliminar
        </button>
      </article>
    </section>
  );
};
export default UserRow;
UserRow.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    superAdmin: PropTypes.bool,
  }),
};
