import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ElectionPage from "./ElectionPage";
import AddElection from "./AddElectionPage.jsx";
import PublishResult from "./PublishResult.js";

// import Admin from './pages/admin/Admin.tsx'

function Admin() {
    return (


        <div>
        <BrowserRouter >
      
            <Routes>
            <Route path="/add-election" element={<AddElection/>}/>
            <Route path="/" element={<AdminDashboard />}/>
            <Route path="/dashboard/:electionId" element={<ElectionPage />}/>
            <Route path="/publish-result" element={<PublishResult/>}/>
            <Route path="/login" element={<AdminLogin/>}/>
            {/* <Route path="/Teams" element={<Team />} />  */}
    
            </Routes> 
        </BrowserRouter>
        
        
        </div>
    )
}

// const router = createBrowserRouter([
//     // {
//     //     path:"/",
//     //     element:<App/>
//     // },
//     //  {
//     //     path:"/admin/login",
//     //     element:<AdminLogin/>
//     // }, 

//     // {
//     //     path:"/admin/dashboard",
//     //     element:<AdminDashboard/>
//     // },
//     {
//         path:"/admin/dashboard/:electionId",
//         element:
//     },
//     {
//         path : "/admin/add-election",
//         element:<AddElection />
//     },
//     {
//         path : "",
//         element:<PublishResult />
//     },])
    export default Admin