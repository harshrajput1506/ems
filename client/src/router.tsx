import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ElectionPage from "./pages/admin/ElectionPage";
import AddElection from "./pages/admin/AddElectionPage";
import PublishResult from "./pages/admin/PublishResult";
import UserDashboard from "./pages/user/UserDashboard";
import KYV from "./pages/user/KYV";
import Vote from "./pages/user/vote";
import Results from "./pages/user/Reults";

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
    {
        path:"/user/dashboard",
        element:<UserDashboard/>
    },
    {
        path:"/user/voting",
        element:<Vote/>
    },
    {
        path:"/user/Know-your-voter",
        element:<KYV/>
    },
    {
        path:"/user/results",
        element:<Results/>
    },
    
    


])

export default router