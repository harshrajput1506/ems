import Hello from "@/components/ui/hello";
import Sidebar from "../../components/ui/Sidebar";
import React, { useState, useEffect, ChangeEvent } from "react";
import constituenciesData from "../../../../server/src/ac/delhi_constituencies.json";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const [choice, setChoice] = useState<String>("");

  useEffect(() => {
    if (constituenciesData.length > 0) {
      setSelectedConstituency(constituenciesData[0].name);
    }
  }, []);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/election/${id}`,
        );
        const { status, message, data } = response.data;

        if (status === "1") {
          const election = data[0];
          setElectionName(election.title);
          setElectionStartDate(election.startdate.split("T")[0]);
          setElectionStartTime(election.startdate.split("T")[1].slice(0, -5));
          setElectionEndDate(election.enddate.split("T")[0]);
          setElectionEndTime(election.enddate.split("T")[1].slice(0, -5));

          const formattedCandidates: Candidates = {};
          formattedCandidates[selectedConstituencyState] =
            election.candidates.map((candidate: any) => ({
              name: candidate.name,
              party: candidate.political_party,
              age: candidate.age.toString(),
            }));

          setCandidates(formattedCandidates);
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
  }, [id]);

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
    if (!candidateNameState || !partyNameState || !candidateAgeState) {
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
      constituency: selectedConstituencyState, // Corrected property name
      electionId: parseInt(id, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/candidate",
        candidateData,
      );

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
              constituency: selectedConstituencyState, // Ensure consistency
            },
          ],
        }));

        // Reset form fields
        setCandidateName("");
        setPartyName("");
        setCandidateAge("");

        alert("New candidate added successfully!");
      } else {
        alert(response.data.message); // Alert error message from server
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate. Please try again.");
    }
  };

  const handleDeleteCandidate = async (index: number) => {
    const candidateToDelete = candidatesState[selectedConstituencyState][index];
    const { name, party, age, constituency } = candidateToDelete; // Corrected property name

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/admin/candidate`,
        {
          data: {
            name,
            party,
            age,
            constituency, // Corrected property name
          },
        },
      );

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
      const response = await axios.patch(
        `http://localhost:8000/api/v1/admin/election/${id}`, // Correct interpolation
        electionData,
      );
      console.log("Election updated:", response.data);
      setShowDialog(true);
      setChoice("update");
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

    const currentDate = new Date().toISOString().slice(0, 10);
    const startTime = electionStartDateState + "T" + electionStartTimeState;
    const endTime = electionEndDateState + "T" + electionEndTimeState;

    let status = "Upcoming";
    if (
      currentDate >= electionStartDateState &&
      currentDate <= electionEndDateState
    ) {
      status = "Ongoing";
    }

    const electionData = {
      ...candidatesState,
      electionStartDate: startTime,
      electionEndDate: endTime,
      status: status,
    };

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/admin/election/${id}`,
        electionData,
      );
      console.log("Election published:", response.data);
      setShowDialog(true);
      setChoice("publish");
    } catch (error) {
      console.error("Error publishing election:", error);
      setError("Failed to publish election. Please try again.");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col lg:flex-row bg-slate-50">
      <Sidebar />
      <div className="p-8 px-4 xl:w-10/12 overflow-x-hidden lg:w-dvw ">
        <Hello />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Election Form</h1>
          <div className="mb-6">
            <label className="block text-gray-850 font-medium">
              Election Name
            </label>
            <input
              type="text"
              value={electionNameState}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setElectionName(e.target.value)
              }
              className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-64"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-850 font-medium">
              Select Constituency
            </label>
            <select
              value={selectedConstituencyState}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedConstituency(e.target.value)
              }
              className="block w-64 p-2 border border-gray-300 rounded-md bg-gray-300"
            >
              {constituenciesData.map((constituency: Constituency) => (
                <option key={constituency.name} value={constituency.name}>
                  {constituency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">
                Candidate Name
              </label>
              <input
                type="text"
                value={candidateNameState}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCandidateName(e.target.value)
                }
                className="mt-1 block w-56 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">
                Political Party
              </label>
              <input
                type="text"
                value={partyNameState}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPartyName(e.target.value)
                }
                className="mt-1 block w-56 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">Age</label>
              <input
                type="text"
                value={candidateAgeState}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCandidateAge(e.target.value)
                }
                className="mt-1 block w-24 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddCandidate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Add Candidate
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Candidates List</h2>
            {candidatesState[selectedConstituencyState] &&
              candidatesState[selectedConstituencyState].length > 0 && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Party
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Age
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {candidatesState[selectedConstituencyState].map(
                      (candidate: Candidate, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {candidate.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.party}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.age}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteCandidate(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Election Timings</h2>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="mb-4">
                <label className="block text-gray-850 font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  value={electionStartDateState}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setElectionStartDate(e.target.value)
                  }
                  className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-56"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-850 font-medium">
                  Start Time
                </label>
                <input
                  type="time"
                  value={electionStartTimeState}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setElectionStartTime(e.target.value)
                  }
                  className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-40"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-850 font-medium">
                  End Date
                </label>
                <input
                  type="date"
                  value={electionEndDateState}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setElectionEndDate(e.target.value)
                  }
                  className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-56"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-850 font-medium">
                  End Time
                </label>
                <input
                  type="time"
                  value={electionEndTimeState}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setElectionEndTime(e.target.value)
                  }
                  className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-40"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Update Election
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Publish Election
            </button>
          </div>
        </div>
      </div>
      {/* Additional components or elements */}
    </div>
  );
};

export default ModifyPage;
