import Hello from "@/components/ui/hello";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";

interface Candidates {
    id: number,
    name: string,
    political_party: string,
    age: number,
    constituency: string,
    electionId: number,
    votes: number
  }
  
  interface Election {
    id: number,
    title: string,
    status: string,
    startdate: string,
    enddate: string,
    candidates: Candidates[],
  }
  



function AdminDashboard() {
    const [currentElections, setCurrentElections] = useState<Election[]>([]);
    const [upcomingElections, setUpcomingElections] = useState<Election[]>([]);
    // const [showCreateElection, setShowCreateElection] = useState(false);
  
    {
      // MAKE API CALL FOR ELECTIONS AND SET THEM IN STATE
    }
    // const handleCreateElection = () => {
    //   setShowCreateElection(true);
    // };
  
    // DUMMY DATA for test 
    const dummy_data = [
      {
        id: 1,
        title: "Delhi State Elections",
        status: "upcoming",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
          { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
          { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
      },
      {
        id: 2,
        title: "Mumbai State Elections",
        status: "current",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
          { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
          { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
      },
      {
        id: 1,
        title: "Delhi State Elections",
        status: "upcoming",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
          { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
          { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
      },
      {
        id: 2,
        title: "Mumbai State Elections",
        status: "current",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
          { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
          { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
      },
      {
        id: 1,
        title: "Delhi State Elections",
        status: "upcoming",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
          { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
          { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
      },
      {
        id: 2,
        title: "Mumbai State Elections",
        status: "current",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
          { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
          { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
      },
    ]
    useEffect(() => {
      const currentElections = dummy_data.filter(election => election.status === "current");
      setCurrentElections(currentElections);
  
      const upcomingElections = dummy_data.filter(election => election.status === "upcoming");
      setUpcomingElections(upcomingElections);
    }, []);
    // console.log(currentElections);
  
  
  
    return (
      <div className="min-h-screen flex flex-col lg:flex-row w-dvw bg-slate-50 w-vdw ">
        {/* Sidebar (Similar to the image you provided) */}
        <Sidebar  />
        <div className="px-4 m-4 w-10/12">
          <div ><Hello /></div>
          <div>
  
            <div className="flex flex-col md:flex-row gap-32 m-1">
              <div>
                <h1 className="mb-4 ml-1">Current Elections</h1>
                <div className="grid grid-cols-1 bg-slate-100 p-3 rounded-md shadow-lg">
                  {
                    currentElections.map((election) => (
                      <div className="p-1 flex m-2">
  
                        <div className="flex flex-col justify-around">
                          <div className="text-md font-medium">{election.title}</div>
                          <div className="text-sm font-light">{election.startdate}</div>
                        </div>
                        <div className="p-2">
  
                          <a href={`/user/voting`} className="bg-white p-1 px-4 rounded-lg">view</a>
  
  
                        </div>
                      </div>
                    ))
                  }</div>
              </div>
              <div>
                <h1 className="mb-4 ml-1">Upcoming Elections</h1>
                <div className="grid grid-cols-1 bg-slate-100 p-3 rounded-md shadow-lg">
                  {
                    upcomingElections.map((election) => (
                      <div className="p-1 flex m-2">
  
                        <div className="flex flex-col justify-around">
                          <div className="text-md font-medium">{election.title}</div>
                          <div className="text-sm font-light">{election.startdate}</div>
                        </div>
                        <div className="p-2">
  
                          <Link to={`/admin/dashboard/${election.id}`} className="bg-white p-1 px-4 rounded-lg">view</Link>
  
  
                        </div>
                      </div>
                    ))
                  }</div>
              </div>
            </div>
  
          </div>
        </div>
  
      </div>
    )
  
   
   
  }

  
export default AdminDashboard