import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/ui/Sidebar";

interface Candidates {
  id: number;
  name: string;
  political_party: string;
  age: number;
  constituency: string;
  electionId: number;
  votes: number;
}

interface Election {
  id: number;
  title: string;
  status: string;
  startdate: string;
  enddate: string;
  candidates: Candidates[];
}

function AdminDashboard() {
  const [currentElections, setCurrentElections] = useState<Election[]>([]);
  const [upcomingElections, setUpcomingElections] = useState<Election[]>([]);
  const [pendingElections, setPendingElections] = useState<Election[]>([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/elections"
        );
        const { data } = response.data; // Destructure 'data' from API response

        // Initialize arrays for each category
        const currentElections: Election[] = [];
        const upcomingElections: Election[] = [];
        const pendingElections: Election[] = [];

        // Categorize elections based on their status
        data.forEach((election: any) => {
          // Use 'any' for flexibility due to dynamic data structure
          if (
            election.status === "Ongoing" ||
            election.status === "Completed"
          ) {
            currentElections.push(election);
          } else if (election.status === "Upcoming") {
            upcomingElections.push(election);
          } else if (election.status === "Pending") {
            pendingElections.push(election);
          }
        });

        // Update state variables with categorized elections
        setCurrentElections(currentElections);
        setUpcomingElections(upcomingElections);
        setPendingElections(pendingElections);
      } catch (error) {
        console.error("Error fetching elections:", error);
        // Handle error case if necessary
      }
    };

    fetchElections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />

      <div className="px-4 m-4 w-10/12">
        <div>
          <div className="flex flex-col md:flex-row gap-32 m-1">
            <div>
              <h1 className="mb-4 ml-1">Current Elections</h1>
              <div className="grid grid-cols-1 bg-slate-100 p-3 rounded-md shadow-lg">
                {currentElections.map((election) => (
                  <div key={election.id} className="p-1 flex m-2">
                    <div className="flex flex-col justify-around">
                      <div className="text-md font-medium">
                        {election.title}
                      </div>
                      <div className="text-sm font-light">
                        {new Date(election.startdate).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        to={`/admin/current-election/${election.id}`}
                        className="bg-white p-1 px-4 rounded-lg"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="mb-4 ml-1">Upcoming Elections</h1>
              <div className="grid grid-cols-1 bg-slate-100 p-3 rounded-md shadow-lg">
                {upcomingElections.map((election) => (
                  <div key={election.id} className="p-1 flex m-2">
                    <div className="flex flex-col justify-around">
                      <div className="text-md font-medium">
                        {election.title}
                      </div>
                      <div className="text-sm font-light">
                        {new Date(election.startdate).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        to={`/admin/upcoming/${election.id}`}
                        className="bg-white p-1 px-4 rounded-lg"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="mb-4 ml-1">Pending Elections</h1>
              <div className="grid grid-cols-1 bg-slate-100 p-3 rounded-md shadow-lg">
                {pendingElections.map((election) => (
                  <div key={election.id} className="p-1 flex m-2">
                    <div className="flex flex-col justify-around">
                      <div className="text-md font-medium">
                        {election.title}
                      </div>
                      <div className="text-sm font-light">
                        {new Date(election.startdate).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        to={`/admin/modify-election/${election.id}`}
                        className="bg-white p-1 px-4 rounded-lg"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
