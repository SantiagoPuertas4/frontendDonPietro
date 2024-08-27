import Swal from "sweetalert2";
import PropTypes from "prop-types";

export const UserInfoTable = ({ user, onLogout }) => {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "swal-button",
        cancelButton: "swal-button-cancel",
      },
    });

    if (result.isConfirmed) {
      onLogout();
    }
  };

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
        <button className="close-button-class" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </article>
    </section>
  );
};

export default UserInfoTable;
UserInfoTable.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
  }),
};
