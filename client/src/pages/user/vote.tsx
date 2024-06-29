import Hello from '@/components/ui/hello'
import Sidebar  from '../../components/ui/Sidebar';
// import jwtDecode from 'jwt-decode';
import mockElections from './elections.json';
import { useEffect,useState } from 'react';


interface Candidate {
  name: string;
  party: string;
}

interface Election {
  electionId: string;
  name: string;
  constituency: string;
  candidates: Candidate[];
}

interface UserVote {
  [electionId: string]: string;
}



const Vote = () => {
  const currentDateTime = new Date();
  const [constituency, setConstituency] = useState<string>('Constituency 1'); // Replace with your logic to get user's constituency
  const [elections, setElections] = useState<Election[]>([]); // State for all elections
  const [selectedElectionId, setSelectedElectionId] = useState<string>(''); // State for selected electionId
  const [userVotes, setUserVotes] = useState<UserVote>({}); // State for user's votes

  useEffect(() => {
    // Simulated data loading or API fetch
   

    // Filter elections based on constituency and current date
    const filteredElections = mockElections.filter(
      election =>
        election.constituency === constituency &&
        new Date(election.startDate) <= currentDateTime &&
        new Date(election.endDate) >= currentDateTime
    );

    setElections(filteredElections);
    setSelectedElectionId(filteredElections.length > 0 ? filteredElections[0].electionId : '');
  }, [constituency]);

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full md:flex-row">
      <Sidebar />

      <div className="px-4 m-4 xl:w-10/12 w-full">
        <div>
          <Hello/>
        </div>

        <div className="min-h-screen p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Election</label>
            <select
              value={selectedElectionId}
              onChange={(e) => setSelectedElectionId(e.target.value)}
              className="block lg:w-1/2 w-full p-2 border border-gray-300 rounded-md"
            >
              {elections.map(election => (
                <option key={election.electionId} value={election.electionId}>
                  {election.name}
                </option>
              ))}
            </select>
          </div>

          {selectedElectionId && (
            <div className="bg-white border-2 shadow-md rounded-lg p-6 mb-8 lg:w-1/2 w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">{selectedElectionId}</h2>
              {elections.find(election => election.electionId === selectedElectionId)?.candidates.map(candidate => (
                <div key={candidate.name} className="flex justify-between items-center mb-2">
                  <span className="md:text-lg text-medium">{candidate.name}</span><span> {candidate.party}</span>
                  {userVotes[selectedElectionId] === candidate.name ? (
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-3xl" disabled>Voted</button>
                  ) : (
                    <button
                      onClick={() => handleVote(selectedElectionId, candidate.name)}
                      className="px-6 py-2 bg-green-700 text-white rounded-3xl"
                      disabled={!!userVotes[selectedElectionId]}
                    >
                      Vote
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {elections.length === 0 && (
            <p className="text-center text-red-500">No ongoing elections available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote