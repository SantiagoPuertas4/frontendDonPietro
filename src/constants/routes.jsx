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
import AdminPrivateView from "../views/routing/AdminPrivateView";
import WaitingForPaymentView from "../views/PendingPaymentView";
import PreparingOrderView from "../views/PreparingOrderView";
import PendingDelivery from "../views/PendingDelivery";
import TVPanelView from "../views/TVPanelView.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "about",
        element: <AboutUsView />,
      },
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
        ],
      },
      {
        path: "",
        element: <AdminPrivateView />,
        children: [
          {
            path: "admin",
            element: <AdminView />,
          },
          {
            path: "waiting",
            element: <WaitingForPaymentView />,
          },
          {
            path: "preparing",
            element: <PreparingOrderView />,
          },
          {
            path: "pendingdelivery",
            element: <PendingDelivery />,
          },
          {
            path: "tvpanel",
            element: <TVPanelView />,
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
