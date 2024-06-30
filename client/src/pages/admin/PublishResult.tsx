import Hello from '@/components/ui/hello';
import Sidebar from "../../components/ui/Sidebar";
import React, { useState, useEffect, ChangeEvent } from 'react';
import data from './constituencies.json';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Candidate {
  name: string;
  party: string;
  votes: number;
}

interface Constituency {
  name: string;
  candidates: Candidate[];
}

interface Election {
  electionId: string;
  electionName: string;
  constituencies: Constituency[];
}

const ElectionResults: React.FC = () => {
  const [selectedElectionId, setSelectedElectionId] = useState<string>('');
  const [selectedConstituency, setSelectedConstituency] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [elections, setElections] = useState<Election[]>(data);
  const [showResults, setShowResults] = useState(false);

  const handleElectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const electionId = event.target.value;
    setSelectedElectionId(electionId);
    setSelectedConstituency('');
    setShowResults(false);
  };

  const handleConstituencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const constituencyName = event.target.value;
    setSelectedConstituency(constituencyName);
    const selectedData = elections
      .find(election => election.electionId === selectedElectionId)
      ?.constituencies.find(constituency => constituency.name === constituencyName);
    if (selectedData) {
      setCandidates(selectedData.candidates);
      setShowResults(true);
    }
  };

  const pieData = {
    labels: candidates.map(candidate => candidate.name),
    datasets: [
      {
        data: candidates.map(candidate => candidate.votes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

  const barData = {
    labels: [...new Set(candidates.map(candidate => candidate.party))],
    datasets: [
      {
        label: 'Votes',
        data: candidates.reduce<{ party: string, votes: number }[]>((acc, candidate) => {
          const partyIndex = acc.findIndex(p => p.party === candidate.party);
          if (partyIndex >= 0) {
            acc[partyIndex].votes += candidate.votes;
          } else {
            acc.push({ party: candidate.party, votes: candidate.votes });
          }
          return acc;
        }, []).map(p => p.votes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

  return (
    <div className="min-h-screen flex bg-slate-50 flex-col w-dvw lg:flex-row">
      <Sidebar />
      <div className="p-8 px-4 w-10/12 ">
        <div><Hello /></div>
        <div className="p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Election Results</h1>
          <div className="mb-4">
            <label className="font-medium block text-gray-850">Select Election</label>
            <select
              value={selectedElectionId}
              onChange={handleElectionChange}
              className="mt-1 block w-64 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select an Election</option>
              {elections.map((election: Election) => (
                <option key={election.electionId} value={election.electionId}>
                  {election.electionName}
                </option>
              ))}
            </select>
          </div>
          {selectedElectionId && (
            <div className="mb-4">
              <label className="font-medium block text-gray-850">Select Constituency</label>
              <select
                value={selectedConstituency}
                onChange={handleConstituencyChange}
                className="mt-1 block w-64 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a Constituency</option>
                {elections.find(election => election.electionId === selectedElectionId)?.constituencies.map((constituency: Constituency) => (
                  <option key={constituency.name} value={constituency.name}>
                    {constituency.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showResults && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-5">Candidates List for {selectedConstituency}</h2>
                <table className="w-full text-center bg-white">
                  <thead>
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Party</th>
                      <th className="py-2">Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, index) => (
                      <tr key={index} className="hover:bg-gray-200">
                        <td className="py-2 px-4 border">{candidate.name}</td>
                        <td className="py-2 px-4 border">{candidate.party}</td>
                        <td className="py-2 px-4 border">{candidate.votes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col justify-between md:flex-row">
                <div className="md:w-1/2 p-4 h-96">
                  <h2 className="text-xl font-bold mb-2">Votes Distribution</h2>
                  <Pie data={pieData} />
                </div>
                <div className="md:w-1/2 h-96">
                  <h2 className="text-xl font-bold mb-2">Vote Share Among Parties</h2>
                  <Bar data={barData} />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button
                  // onClick={}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Publish Result
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionResults;
