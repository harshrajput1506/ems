import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login"
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
import UserProfile from "./pages/user/profile";
import CurrentElectionPage from './pages/admin/currentElection'

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>
    },

    {
        path:"/user/login",
        element:<Login/>
    },

    {
        path:"/user/register",
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
        path:"/admin/current-election/:electionId",
        element:<CurrentElectionPage />
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
        path:"/user/profile",
        element:<UserProfile/>
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