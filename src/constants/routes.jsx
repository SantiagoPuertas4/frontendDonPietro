import { createBrowserRouter } from "react-router-dom";

import RootView from "../views/routing/RootView";
import AuthViews from "../views/routing/AuthViews";
import PrivateView from "../views/routing/PrivateView";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import RegisterView from "../views/RegisterView";
import MenuView from "../views/MenuView";
import CartView from "../views/CartView";
import MyAccountView from "../views/MyAccountView";
import AdminView from "../views/AdminView";
import AboutUsView from "../views/AboutUsView";
import Error404View from "../views/Error404View";

// 2 Tipos de rutas: Públicas y Privadas
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      // RUTAS PÚBLICAS
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "about",
        element: <AboutUsView />,
      },

      // RUTAS DE AUTENTICACION
      // no deberían poder accederse estando logueados
      {
        path: "",
        element: <AuthViews />,
        children: [
          {
            path: "login",
            element: <LoginView />,
          },
          {
            path: "register",
            element: <RegisterView />,
          },
        ],
      },
      // RUTAS PRIVADAS
      {
        path: "",
        element: <PrivateView />,
        children: [
          {
            path: "menu",
            element: <MenuView />,
          },
          {
            path: "cart",
            element: <CartView />,
          },
          {
            path: "my-account",
            element: <MyAccountView />,
          },
          {
            path: "admin",
            element: <AdminView />,
          },
        ],
      },
      {
        path: "*",
        element: <Error404View />,
      },
    ],
  },
]);
