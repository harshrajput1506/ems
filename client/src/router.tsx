import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

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

    {
        path:"/admin/dashboard",
        element:<AdminDashboard/>
    },
])

export default router