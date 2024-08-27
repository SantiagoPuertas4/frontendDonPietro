import { Navigate, Outlet } from "react-router-dom";

import { useSession } from "../../stores/useSession";

const AuthViews = () => {
  const { isLoggedIn } = useSession();

  if (isLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
};

export default AuthViews;
