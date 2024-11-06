import { createBrowserRouter } from "react-router-dom";
import { UserInterface } from "./pages/UserInterface";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserInterface />,
  },
]);
