import Hello from "@/components/ui/hello";
import Sidebar from "../../components/ui/Sidebar";
import React, { useState, useEffect, ChangeEvent } from "react";
import constituenciesData from "../../../../server/src/ac/delhi_constituencies.json";
import { useParams } from "react-router-dom";
import api from "@/utils/api";
import { useNavigate } from "react-router-dom";

interface Candidate {
  name: string;
  party: string;
  age: string;
  constituency: string;
}

interface Constituency {
  name: string;
}

interface Candidates {
  [key: string]: Candidate[];
}

interface ElectionPageProps {
  electionName?: string;
  selectedConstituency?: string;
  candidateName?: string;
  partyName?: string;
  candidateAge?: string;
  candidates?: Candidates;
  electionStartDate?: string;
  electionStartTime?: string;
  electionEndDate?: string;
  electionEndTime?: string;
}

const ModifyPage: React.FC<ElectionPageProps> = ({
  electionName = "",
  selectedConstituency = "",
  candidateName = "",
  partyName = "",
  candidateAge = "",
  candidates = {},
  electionStartDate = "",
  electionStartTime = "",
  electionEndDate = "",
  electionEndTime = "",
}) => {
  const [electionNameState, setElectionName] = useState<string>(electionName);
  const [selectedConstituencyState, setSelectedConstituency] =
    useState<string>(selectedConstituency);
  const [candidateNameState, setCandidateName] =
    useState<string>(candidateName);
  const [partyNameState, setPartyName] = useState<string>(partyName);
  const [candidateAgeState, setCandidateAge] = useState<string>(candidateAge);
  const [candidatesState, setCandidates] = useState<Candidates>(candidates);
  const [electionStartDateState, setElectionStartDate] =
    useState<string>(electionStartDate);
  const [electionStartTimeState, setElectionStartTime] =
    useState<string>(electionStartTime);
  const [electionEndDateState, setElectionEndDate] =
    useState<string>(electionEndDate);
  const [electionEndTimeState, setElectionEndTime] =
    useState<string>(electionEndTime);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (constituenciesData.length > 0) {
      setSelectedConstituency(constituenciesData[0].name);
    }
  }, []);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const response = await api.get(`/election/${id}`);
        const { status, message, data } = response.data;

        if (status === "1") {
          const election = data[0];
          setElectionName(election.title);
          setElectionStartDate(election.startdate.split("T")[0]);
          setElectionStartTime(election.startdate.split("T")[1].slice(0, -5));
          setElectionEndDate(election.enddate.split("T")[0]);
          setElectionEndTime(election.enddate.split("T")[1].slice(0, -5));

          // Initialize candidatesState with empty arrays for all constituencies
          const initialCandidates: Candidates = {};
          constituenciesData.forEach((constituency: Constituency) => {
            initialCandidates[constituency.name] = [];
          });

          // Populate candidates for constituencies that have data
          election.candidates.forEach((candidate: any) => {
            const constituency =
              candidate.constituency || selectedConstituencyState;
            if (!initialCandidates[constituency]) {
              initialCandidates[constituency] = [];
            }
            initialCandidates[constituency].push({
              name: candidate.name,
              party: candidate.political_party,
              age: candidate.age.toString(),
              constituency: constituency,
            });
          });

          setCandidates(initialCandidates);
        } else {
          console.error(message);
          setError("Failed to fetch election data.");
        }
      } catch (error) {
        console.error("Error fetching election data:", error);
        setError("Failed to fetch election data. Please try again.");
      }
    };

    fetchElectionData();
  }, [id, selectedConstituencyState]);

  useEffect(() => {
    const savedData = localStorage.getItem("electionData");
    if (savedData) {
      const {
        electionName,
        constituencies,
        electionStartDate,
        electionStartTime,
        electionEndTime,
        electionEndDate,
      } = JSON.parse(savedData);

      setElectionName(electionName);
      setCandidates(constituencies);
      setElectionStartDate(electionStartDate);
      setElectionStartTime(electionStartTime);
      setElectionEndDate(electionEndDate);
      setElectionEndTime(electionEndTime);

      if (constituenciesData.length > 0) {
        setSelectedConstituency(constituenciesData[0].name);
      }
    }
  }, []);

  const handleAddCandidate = async () => {
    if (
      !candidateNameState ||
      !partyNameState ||
      !candidateAgeState ||
      !selectedConstituencyState
    ) {
      alert("All fields are mandatory!");
      return;
    }
    if (!id) {
      alert("Election ID is missing!");
      return;
    }
    const candidateData = {
      name: candidateNameState,
      age: parseInt(candidateAgeState, 10),
      political_party: partyNameState,
      constituency: selectedConstituencyState,
      electionId: parseInt(id, 10),
    };
    try {
      const response = await api.post("/admin/candidate", candidateData);
      if (response.data.status === "1") {
        // Update local state with the new candidate
        setCandidates((prev) => ({
          ...prev,
          [selectedConstituencyState]: [
            ...(prev[selectedConstituencyState] || []),
            {
              name: candidateNameState,
              party: partyNameState,
              age: candidateAgeState,
              constituency: selectedConstituencyState,
            },
          ],
        }));
        // Reset form fields
        setCandidateName("");
        setPartyName("");
        setCandidateAge("");
        alert("New candidate added successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        // Optionally, redirect to login page here
      } else {
        alert("Failed to add candidate. Please try again.");
      }
    }
  };
  const handleDeleteCandidate = async (index: number) => {
    const candidateToDelete = candidatesState[selectedConstituencyState][index];
    const { name, party, age, constituency } = candidateToDelete; // Corrected property name

    try {
      const response = await api.delete(`/admin/candidate`, {
        data: {
          name,
          party,
          age,
          constituency, // Corrected property name
        },
      });

      if (response.data.status === "1") {
        setCandidates((prev) => ({
          ...prev,
          [selectedConstituencyState]: prev[selectedConstituencyState].filter(
            (_, i) => i !== index,
          ),
        }));
        alert("Candidate deleted successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Failed to delete candidate. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (
      !electionNameState ||
      !electionStartDateState ||
      !electionStartTimeState ||
      !electionEndTimeState
    ) {
      alert("All fields are mandatory!");
      return;
    }

    const electionData = {
      electionName: electionNameState,
      constituencies: candidatesState,
      electionStartDate: electionStartDateState,
      electionStartTime: electionStartTimeState,
      electionEndTime: electionEndTimeState,
      electionEndDate: electionEndDateState,
    };

    const jsonString = JSON.stringify(electionData, null, 2);
    localStorage.setItem("electionData", jsonString);

    try {
      const response = await api.patch(
        `/admin/election/${id}`, // Correct interpolation
        electionData,
      );
      console.log("Election updated:", response.data);
      setDialogMessage("Election Updated Successfully");
      setShowDialog(true);
    } catch (error) {
      console.error("Error updating election:", error);
      setError("Failed to update election. Please try again.");
    }
  };

  const handlePublish = async () => {
    if (
      !electionStartDateState ||
      !electionStartTimeState ||
      !electionEndTimeState
    ) {
      alert("Election start and end details are mandatory!");
      return;
    }

    const startTime = electionStartDateState + "T" + electionStartTimeState;
    const endTime = electionEndDateState + "T" + electionEndTimeState;

    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);

    // Current date and time
    const currentDateTime = new Date();

    let status = "Upcoming";
    if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
      status = "Ongoing";
    } else if (currentDateTime > endDateTime) {
      status = "Completed";
    } else {
      status = "Upcoming";
    }
    const electionData = {
      electionName: electionNameState,
      electionStartDate: startTime,
      electionEndDate: endTime,
      electionStatus: status,
    };

    const jsonString = JSON.stringify(electionData, null, 2);
    localStorage.setItem("electionData", jsonString);
    setDialogMessage("Election Published Successfully");
    setShowDialog(true);

    try {
      const response = await api.patch(
        `/admin/election/publish/${id}/${status}`,
      );
      console.log("Election published:", response.data);
    } catch (error) {
      console.error("Error publishing election:", error);
      setError("Failed to publish election. Please try again.");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/admin/election/${id}`);
      console.log("Election deleted:", response.data);
      setDialogMessage("Election Deleted Successfully");
      setShowDialog(true);
    } catch (error) {
      console.error("Error deleting election:", error);
      setError("Failed to delete election. Please try again.");
    }
  };
  const handleDialogClose = () => {
    setShowDialog(false);
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 w-full">
        <Hello />
        <div className="px-6 py-8 bg-white shadow-lg rounded-lg">
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Election Name
            </label>
            <input
              type="text"
              placeholder="Election Name"
              value={electionNameState}
              onChange={(e) => setElectionName(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={electionStartDateState}
                onChange={(e) => setElectionStartDate(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={electionStartTimeState}
                onChange={(e) => setElectionStartTime(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Date
              </label>
              <input
                type="date"
                value={electionEndDateState}
                onChange={(e) => setElectionEndDate(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Time
              </label>
              <input
                type="time"
                value={electionEndTimeState}
                onChange={(e) => setElectionEndTime(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Constituency
            </label>
            <select
              value={selectedConstituencyState}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            >
              {constituenciesData.map((constituency: Constituency) => (
                <option key={constituency.name} value={constituency.name}>
                  {constituency.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateNameState}
              onChange={(e) => setCandidateName(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className=" mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Party Name
            </label>
            <input
              type="text"
              placeholder="Party Name"
              value={partyNameState}
              onChange={(e) => setPartyName(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Candidate Age
            </label>
            <input
              type="text"
              placeholder="Candidate Age"
              value={candidateAgeState}
              onChange={(e) => setCandidateAge(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <button
            onClick={handleAddCandidate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Candidate
          </button>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Candidates</h3>

            <ul>
              {candidatesState &&
              Object.keys(candidatesState).length > 0 &&
              candidatesState[selectedConstituencyState] &&
              candidatesState[selectedConstituencyState].length > 0 ? (
                candidatesState[selectedConstituencyState].map(
                  (candidate: Candidate, index: number) => (
                    <li key={index} className="flex justify-between mb-2">
                      <div>
                        {candidate.name} - {candidate.party} - {candidate.age}
                      </div>
                      <button
                        onClick={() => handleDeleteCandidate(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </li>
                  ),
                )
              ) : (
                <li>No candidates for this constituency</li>
              )}
            </ul>
          </div>
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
            <button
              onClick={handlePublish}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Publish
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">{dialogMessage}</h2>
            <button
              onClick={handleDialogClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyPage;
