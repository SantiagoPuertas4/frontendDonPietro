import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";

import { useSession } from "../../stores/useSession";
import { useCart } from "../../stores/useCart";

import "./Header.css";

const Header = () => {
  const { user, isLoggedIn, logout, tableNumber } = useSession();
  const { items } = useCart();

  const handleLogout = async () => {
    const action = await Swal.fire({
      icon: "question",
      title: "Atención",
      text: "¿Está seguro que desea cerrar sesión?",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
      customClass: {
        confirmButton: "confirm-button-class",
        cancelButton: "cancel-button-class",
      },
    });

    if (action.isConfirmed) {
      logout();
    }
  };

  const isAdmin = user ? user.isAdmin : false;
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0 p-0 fixed-top">
      <div className="container-fluid custom-padding">
        <Link className="navbar-brand p-0 m-0" to={isAdmin ? "/admin" : "/"}>
          <img
            className="logoHeader"
            src="/DonPietro.png"
            alt="Logo Don Pietro"
          />
        </Link>
        <button
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
          type="button"
        >
          <i className="bi bi-list"></i>
        </button>
        <div className="collapse navbar-collapse pb-2" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex gap-2">
            {!isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/"
                  >
                    Inicio
                  </NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/login"
                  >
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/register"
                  >
                    Registro
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && !isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/menu"
                  >
                    Menú
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/cart"
                  >
                    Carrito
                    {totalItems > 0 && (
                      <span className="badge bg-light text-dark ms-2">
                        {totalItems}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/my-account"
                  >
                    Mi Cuenta
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/admin"
                  >
                    Administración
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/tvpanel"
                  >
                    PanelTV
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/waiting"
                  >
                    Pagar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/preparing"
                  >
                    Preparar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/pendingdelivery"
                  >
                    Retirar
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/about"
                  >
                    Acerca de
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                {tableNumber && !isAdmin && (
                  <li className="nav-item">
                    <span className="nav-link">Mesa: {tableNumber}</span>
                  </li>
                )}
                <button className="close-button-class" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
