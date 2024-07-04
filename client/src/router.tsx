import { createBrowserRouter, RouteObject } from "react-router-dom";
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
import UserProfile from "./pages/user/profile";
import CurrentElectionPage from "./pages/admin/currentElection";
import ModifyPage from "./pages/admin/ModifyPage";
import ProtectedRoute from "./components/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/upcoming/:electionId",
    element: (
      <ProtectedRoute adminOnly>
        <ElectionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/current-election/:electionId",
    element: (
      <ProtectedRoute adminOnly>
        <CurrentElectionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/add-election",
    element: (
      <ProtectedRoute adminOnly>
        <AddElection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/modify-election/:id",
    element: (
      <ProtectedRoute adminOnly>
        <ModifyPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/publish-result",
    element: (
      <ProtectedRoute adminOnly>
        <PublishResult />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/voting",
    element: (
      <ProtectedRoute>
        <Vote />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/know-your-voter",
    element: (
      <ProtectedRoute>
        <KYV />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/results",
    element: (
      <ProtectedRoute>
        <Results />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
