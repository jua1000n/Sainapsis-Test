import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <>
      <div className="md:px-10 max-w-[1400px] ml-auto mr-auto">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
