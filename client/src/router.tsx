import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ElectionPage from "./pages/admin/ElectionPage";
import AddElection from "./pages/admin/AddElectionPage.jsx";
import PublishResult from "./pages/admin/PublishResult.jsx";


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
    {
        path:"/admin/dashboard/:electionId",
        element:<ElectionPage />
    },
    {
        path : "/admin/add-election",
        element:<AddElection />
    },
    {
        path : "/admin/publish-result",
        element:<PublishResult />
    },

])

export default router