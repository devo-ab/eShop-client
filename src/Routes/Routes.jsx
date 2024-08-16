import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts/Layouts";
import Error from "../Error/Error";
import Home from "../Home/Home";
import Product from "../Components/Product";
import LogIn from "../Components/LogIn";
import SingUp from "../Components/SingUp";

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
        {
            path : "/all-product",
            element : <Product></Product>
        },
        {
            path : "/login",
            element : <LogIn></LogIn>
        },
        {
            path : "/signup",
            element : <SingUp></SingUp>
        }
    ]
  },
]);

export default router;