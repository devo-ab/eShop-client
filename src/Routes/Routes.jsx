import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Error from "../Error/Error";
import Home from "../Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    errorElement : <Error></Error>,
    children : [
        {
            path : "/",
            element : <Home></Home>
        },
    ]
  },
]);

export default router;