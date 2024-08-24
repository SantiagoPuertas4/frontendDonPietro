import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../stores/useSession";
import { decodeJWT } from "../../utilities/decodeJWT";

const AdminPrivateView = () => {
  const { isLoggedIn } = useSession();
  const token = sessionStorage.getItem("token");

  if (token) {
    const key = decodeJWT(token);
    if (isLoggedIn && key.user.isAdmin) return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default AdminPrivateView;
