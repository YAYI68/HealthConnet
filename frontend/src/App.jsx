import { useEffect } from "react";
import { RouterProvider} from "react-router-dom"

import { router } from "./router";
import useUser from "./hooks/useUser";
import { useAuthContext } from "./context/AuthContext";

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
