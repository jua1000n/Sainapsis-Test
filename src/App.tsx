import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { OrderStatusHistoryProvider } from "./contexts/OrderStatusHistoryContext";

function App() {
  return (
    <>
      <div className="md:px-10 max-w-[1400px] ml-auto mr-auto">
        <OrderStatusHistoryProvider>
          <RouterProvider router={router} />
        </OrderStatusHistoryProvider>
      </div>
    </>
  );
}

export default App;
