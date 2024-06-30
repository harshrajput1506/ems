import React, { useState, useEffect } from 'react';
import Hello from '@/components/ui/hello';
import Sidebar from '../../components/ui/Sidebar';
import mockElections from './elections.json';

interface Candidate {
  name: string;
  party: string;
}

interface Election {
  electionId: string;
  name: string;
  electionDetails: {
    constituency: string;
    candidates: Candidate[];
    startDate: string;
    endDate: string;
  }[];
}

interface User {
  name: string;
  voterId: string;
  constituency: string;
  age: number;
  phoneNumber: string;
}

interface UserVote {
  [electionId: string]: string;
}

const Vote = () => {
  const currentDateTime = new Date();
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    voterId: 'V123456',
    constituency: 'Constituency 1', // Replace with actual user data
    age: 30, // Replace with actual user data
    phoneNumber: '123-456-7890' // Replace with actual user data
  });

  const [elections, setElections] = useState<Election[]>([]); // State for all elections
  const [selectedElectionId, setSelectedElectionId] = useState<string>(''); // State for selected electionId
  const [selectedConstituency, setSelectedConstituency] = useState<string>(''); // State for selected constituency
  const [userVotes, setUserVotes] = useState<UserVote>({}); // State for user's votes

  useEffect(() => {
    // Simulated data loading or API fetch
    setElections(mockElections);
    setSelectedElectionId(mockElections.length > 0 ? mockElections[0].electionId : '');
  }, []);

  const handleVote = (electionId: string, candidateName: string) => {
    setUserVotes(prevVotes => ({ ...prevVotes, [electionId]: candidateName }));
    localStorage.setItem('userVotes', JSON.stringify({ ...userVotes, [electionId]: candidateName }));
  };

  useEffect(() => {
    const storedVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      setUserVotes(JSON.parse(storedVotes));
    }
  }, []);

  const canUserVote = (election: Election, constituency: string): boolean => {
    return user.constituency === constituency;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full md:flex-row">
      <Sidebar />

      <div className="px-4 m-4 xl:w-10/12 w-full">
        <div>
          <Hello />
        </div>

        {/* Display selected election details */}
        {selectedElectionId && (
          <>
            <div className="p-4 px-8">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">{elections.find(e => e.electionId === selectedElectionId)?.name}</h1>
                {/* <span className="text-sm">Status: {elections.find(e => e.electionId === selectedElectionId)?.status}</span> */}
              </div>
            </div>
            <div className="p-4 px-8">
              <div className="flex justify-between">
                <span>Start Date: {elections.find(e => e.electionId === selectedElectionId)?.electionDetails[0].startDate}</span>
                <span>End Date: {elections.find(e => e.electionId === selectedElectionId)?.electionDetails[0].endDate}</span>
              </div>
            </div>
          </>
        )}

        <div className="min-h-screen p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Election</label>
            <select
              value={selectedElectionId}
              onChange={(e) => {
                setSelectedElectionId(e.target.value);
                setSelectedConstituency('');
              }}
              className="block lg:w-1/2 w-full p-2 border border-gray-300 rounded-md"
            >
              {elections.map(election => (
                <option key={election.electionId} value={election.electionId}>
                  {election.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display constituencies for selected election */}
          {selectedElectionId && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Select Constituency</label>
              <select
                value={selectedConstituency}
                onChange={(e) => setSelectedConstituency(e.target.value)}
                className="block lg:w-1/2 w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Constituency</option>
                {elections.find(e => e.electionId === selectedElectionId)?.electionDetails.map(detail => (
                  <option key={detail.constituency} value={detail.constituency}>
                    {detail.constituency}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Display candidates for selected constituency */}
          {selectedElectionId && selectedConstituency && (
            <div className="bg-white border-2 shadow-md rounded-lg p-6 mb-8 lg:w-1/2 w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">Candidates</h2>
              {elections
                .find(e => e.electionId === selectedElectionId)
                ?.electionDetails.find(detail => detail.constituency === selectedConstituency)
                ?.candidates.map(candidate => (
                  <div key={candidate.name} className="flex justify-between items-center mb-2">
                    <span className="md:text-lg text-medium">{candidate.name}</span><span> {candidate.party}</span>
                    {canUserVote(elections.find(e => e.electionId === selectedElectionId)!, selectedConstituency) ? (
                      userVotes[selectedElectionId] === candidate.name ? (
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-3xl" disabled>Voted</button>
                      ) : (
                        <button
                          onClick={() => handleVote(selectedElectionId, candidate.name)}
                          className="px-6 py-2 bg-green-700 text-white rounded-3xl"
                          disabled={!!userVotes[selectedElectionId]}
                        >
                          Vote
                        </button>
                      )
                    ) : (
                      <span className="text-red-500">Not eligible to vote in this constituency</span>
                    )}
                  </div>
                ))}
            </div>
          )}

          {elections.length === 0 && (
            <p className="text-center text-red-500">No ongoing elections available for your constituency.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;
