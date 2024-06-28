import Hello from '@/components/ui/hello'
import VotingPage from '@/components/ui/VotingPage'
import Sidebar from "../../components/ui/Sidebar";
import React, { useState, useEffect } from 'react';
import constituenciesData from 'C:/Users/user/Desktop/ems/server/src/ac/delhi_constituencies.json';

const ElectionPage = () => {
  const [electionName, setElectionName] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [candidateAge, setCandidateAge] = useState('');
  const [candidates, setCandidates] = useState({});
  const [electionDate, setElectionDate] = useState('');
  const [electionTime, setElectionTime] = useState('');

  useEffect(() => {
    if (constituenciesData.length > 0) {
      setSelectedConstituency(constituenciesData[0].name);
    }
  }, []);

  const handleAddCandidate = () => {
    if (!candidateName || !partyName || !candidateAge) {
      alert("All fields are mandatory!");
      return;
    }

    setCandidates(prev => ({
      ...prev,
      [selectedConstituency]: [
        ...(prev[selectedConstituency] || []),
        { name: candidateName, party: partyName, age: candidateAge }
      ]
    }));
    setCandidateName('');
    setPartyName('');
    setCandidateAge('');
  };

  const handleDeleteCandidate = (index) => {
    setCandidates(prev => ({
      ...prev,
      [selectedConstituency]: prev[selectedConstituency].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!electionName || !electionDate || !electionTime) {
      alert("All fields are mandatory!");
      return;
    }

    const electionData = {
      electionName,
      constituencies: candidates,
      electionDate,
      electionTime,
    };

    const jsonString = JSON.stringify(electionData, null, 2);
    console.log(jsonString);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-dvw">
    {/* Sidebar (Similar to the image you provided) */}
    <Sidebar />
    <div className="p-8 px-4   bg-slate-50 w-10/12">
      <div  ><Hello /></div>
      <div>
        {/* <VotingPage/> */}





        <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">Election Form</h1>
      <div className="mb-6" >
        <label className="block text-gray-850 font-medium">Election Name</label>
        <input
          type="text"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
          className="mt-1 block  p-2 border border-gray-300 rounded-md bg-gray-300 w-64"
        />
      </div>
      {/* <div className='bg-black text-white'>asdsd</div> */}
      <div className="mb-6">
        <label className="block text-gray-850 font-medium">Select Constituency</label>
        <select
          value={selectedConstituency}
          onChange={(e) => setSelectedConstituency(e.target.value)}
          className=" block w-64  p-2 border border-gray-300 rounded-md bg-gray-300"
        >
          {constituenciesData.map((constituency) => (
            <option key={constituency.id} value={constituency.name}>
              {constituency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-32 m-1">

      <div className="mb-4">
        <label className="block text-gray-850 font-medium">Candidate Name</label>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="mt-1 block w-56 p-2 border border-gray-300 rounded-md bg-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-850 font-medium">Political Party</label>
        <input
          type="text"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          className="mt-1 block w-56 p-2 border border-gray-300 rounded-md bg-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-850 font-medium">Age</label>
        <input
          type="number"
          value={candidateAge}
          onChange={(e) => setCandidateAge(e.target.value)}
          className="mt-1 block w-56 p-2 border border-gray-300 rounded-md bg-gray-300"
        />
      </div>

      
      <button
        onClick={handleAddCandidate}
        className="m-6 px-4 py-2 bg-lime-500 text-white rounded-md"
      >
        Add Candidate
      </button>

      </div>
      {!candidates[selectedConstituency]?<div></div>:
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Candidates List for {selectedConstituency}</h2>
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
            {(candidates[selectedConstituency] || []).map((candidate, index) => (
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
      <div className="mb-6">
        <label className="block text-gray-850 font-medium">Election Date</label>
        <input
          type="date"
          value={electionDate}
          onChange={(e) => setElectionDate(e.target.value)}
          className="mt-1 block  p-2 border border-gray-300 rounded-md bg-gray-300 w-64"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-850 font-medium">Election Time</label>
        <input
          type="time"
          value={electionTime}
          onChange={(e) => setElectionTime(e.target.value)}
          className="mt-1 block w-64 p-2 border border-gray-300 rounded-md bg-gray-300"
        />
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
    </div>
  )
}

export default ElectionPage