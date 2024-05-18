import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>
    },

    {
        path:"/login",
        element:<Login/>
    },

    {
        path:"/register",
        element:<Register/>
    },
    
    {
        path:"/admin/login",
        element:<AdminLogin/>
    },
])

export default router