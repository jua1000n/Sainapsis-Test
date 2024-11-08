import { createBrowserRouter } from "react-router-dom";
import { UserInterface } from "./pages/UserInterface";
import { OrderManagement } from "./pages/OrderManagement";
import { TransitionLog } from "./pages/TransitionLog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserInterface />,
  },
  {
    path: "/order-management",
    element: <OrderManagement />,
  },
  {
    path: "/transition-logs",
    element: <TransitionLog />,
  },
]);
