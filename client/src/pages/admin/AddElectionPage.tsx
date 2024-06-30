import Hello from '@/components/ui/hello'
// import VotingPage from '@/components/ui/VotingPage'
import Sidebar from "../../components/ui/Sidebar";
import React, { useState, useEffect, ChangeEvent } from 'react';
import constituenciesData from 'C:/Users/user/Desktop/ems/server/src/ac/delhi_constituencies.json';

interface Candidate {
  name: string;
  party: string;
  age: string;
}

interface Constituency {
  name: string;
}

interface Candidates {
  [key: string]: Candidate[];
}

// import React, { useState, useEffect, ChangeEvent } from 'react';

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

const ElectionPage: React.FC<ElectionPageProps> = ({
  electionName = '',
  selectedConstituency = '',
  candidateName = '',
  partyName = '',
  candidateAge = '',
  candidates = {},
  electionStartDate = '',
  electionStartTime = '',
  electionEndDate = '',
  electionEndTime = ''
}) => {
  const [electionNameState, setElectionName] = useState<string>(electionName);
  const [selectedConstituencyState, setSelectedConstituency] = useState<string>(selectedConstituency);
  const [candidateNameState, setCandidateName] = useState<string>(candidateName);
  const [partyNameState, setPartyName] = useState<string>(partyName);
  const [candidateAgeState, setCandidateAge] = useState<string>(candidateAge);
  const [candidatesState, setCandidates] = useState<Candidates>(candidates);
  const [electionStartDateState, setElectionStartDate] = useState<string>(electionStartDate);
  const [electionStartTimeState, setElectionStartTime] = useState<string>(electionStartTime);
  const [electionEndDateState, setElectionEndDate] = useState<string>(electionEndDate);
  const [electionEndTimeState, setElectionEndTime] = useState<string>(electionEndTime);

  useEffect(() => {
    if (constituenciesData.length > 0) {
      setSelectedConstituency(constituenciesData[0].name);
    }
  }, []);

  const handleAddCandidate = () => {
    if (!candidateNameState || !partyNameState || !candidateAgeState) {
      alert("All fields are mandatory!");
      return;
    }

    setCandidates(prev => ({
      ...prev,
      [selectedConstituencyState]: [
        ...(prev[selectedConstituencyState] || []),
        { name: candidateNameState, party: partyNameState, age: candidateAgeState }
      ]
    }));
    setCandidateName('');
    setPartyName('');
    setCandidateAge('');
  };

  const handleDeleteCandidate = (index: number) => {
    setCandidates(prev => ({
      ...prev,
      [selectedConstituencyState]: prev[selectedConstituencyState].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!electionNameState || !electionStartDateState || !electionStartTimeState || !electionEndTimeState) {
      alert("All fields are mandatory!");
      return;
    }

    const electionData = {
      electionName: electionNameState,
      constituencies: candidatesState,
      electionStartDate: electionStartDateState,
      electionStartTime: electionStartTimeState,
      electionEndTime: electionEndTimeState,
      electionEndDate: electionEndDateState
    };

    const jsonString = JSON.stringify(electionData, null, 2);
    console.log(jsonString);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-dvw bg-slate-50">
      <Sidebar />
      <div className="p-8 px-4  xl:w-10/12 lg:w-dvw ">
        <div><Hello /></div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Election Form</h1>
          <div className="mb-6">
            <label className="block text-gray-850 font-medium">Election Name</label>
            <input
              type="text"
              value={electionNameState}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setElectionName(e.target.value)}
              className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-64"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-850 font-medium">Select Constituency</label>
            <select
              value={selectedConstituencyState}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedConstituency(e.target.value)}
              className="block w-64 p-2 border border-gray-300 rounded-md bg-gray-300"
            >
              {constituenciesData.map((constituency: Constituency) => (
                <option value={constituency.name}>
                  {constituency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row 2xl:gap-28 xl:gap-20 lg:gap-12 m-1">
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">Candidate Name</label>
              <input
                type="text"
                value={candidateNameState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateName(e.target.value)}
                className="mt-1 block w-56 xl:w-40 lg:w-32 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">Political Party</label>
              <input
                type="text"
                value={partyNameState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPartyName(e.target.value)}
                className="mt-1 block w-56 xl:w-40 lg:w-32 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">Age</label>
              <input
                type="number"
                value={candidateAgeState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateAge(e.target.value)}
                className="mt-1 block w-56 xl:w-40 lg:w-32 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>

            <button
              onClick={handleAddCandidate}
              className="m-6 px-4 py-2 bg-lime-500 text-white rounded-md"
            >
              Add Candidate
            </button>
          </div>

          {!candidatesState[selectedConstituencyState] ? <div></div> :
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Candidates List for {selectedConstituencyState}</h2>
              <table className="min-w-full w-full bg-white text-center">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Party</th>
                    <th className="py-2">Age</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(candidatesState[selectedConstituencyState] || []).map((candidate, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="py-2 px-4 border">{candidate.name}</td>
                      <td className="py-2 px-4 border">{candidate.party}</td>
                      <td className="py-2 px-4 border">{candidate.age}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleDeleteCandidate(index)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

          <div className='flex flex-col lg:flex-row lg:gap-64'>
            <div className="mb-6">
              <label className="block text-gray-850 font-medium">Election Start Date</label>
              <input
                type="date"
                value={electionStartDateState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setElectionStartDate(e.target.value)}
                className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-64"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">Election Start Time</label>
              <input
                type="time"
                value={electionStartTimeState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setElectionStartTime(e.target.value)}
                className="mt-1 block w-64 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row lg:gap-64'>
            <div className="mb-6">
              <label className="block text-gray-850 font-medium">Election End Date</label>
              <input
                type="date"
                value={electionEndDateState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setElectionEndDate(e.target.value)}
                className="mt-1 block p-2 border border-gray-300 rounded-md bg-gray-300 w-64"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-850 font-medium">Election End Time</label>
              <input
                type="time"
                value={electionEndTimeState}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setElectionEndTime(e.target.value)}
                className="mt-1 block w-64 p-2 border border-gray-300 rounded-md bg-gray-300"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save Election
          </button>
        </div>
      </div>
    </div>
  );
}

export default ElectionPage;
