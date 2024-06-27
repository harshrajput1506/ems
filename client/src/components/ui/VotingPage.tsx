
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';

const VotingPage = () => {
    const { electionId } = useParams();
    // const [election, setElection] = React.useState({} as any);

    const dummy_election = {
        id: 2,
        title: "Mumbai State Elections",
        status: "current",
        startdate: '27/06/2024',
        enddate: "27/06/2024",
        candidates: [
            { id: 1, name: "Modi", political_party: "AAP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
            { id: 2, name: "RaGa", political_party: "BJP", age: 45, constituency: "Tilak Nagar", electionId: 2, votes: 0 },
        ],
    }
    // setElection(dummy_election)

    // REQUEST MAAR DE USING electionId as the election id 


    return (
        <div>
            <div className="p-4 px-8">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold"> {dummy_election.title}</h1>
                    <span className="text-sm ">Status: {dummy_election.status}</span>
                    <div className=' border-b border-zinc-200' />
                </div>
            </div>
            <div className="p-4 px-8">
                <div className="flex justify-between">
                    <span>Start Date: {dummy_election.startdate}</span>
                    <span>End Date: {dummy_election.enddate}</span>
                </div>
            </div>
            <div className="p-4 px-8">
                <div className="flex justify-between">
                    <span className="font-semibold">Results</span>
                    <div className=' border-b border-zinc-200' />
                </div>
            </div>
            <div className="flex p-1 md:p-4 lg:p-16">
                <Table>
                    <TableCaption>Results End here .</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Candidate Name</TableHead>
                            <TableHead>
                                Candidate's Party
                            </TableHead>
                            <TableHead>Cnstituency</TableHead>
                            <TableHead className="text-right">Age</TableHead>
                            <TableHead className="text-right">Votes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            dummy_election.candidates.map((candidate) => (
                                <TableRow id={`${candidate.id}`}>
                                    <TableCell className="w-[100px]">{candidate.name}</TableCell>
                                    <TableCell>
                                        {candidate.political_party}
                                    </TableCell>
                                    <TableCell>{candidate.constituency}</TableCell>
                                    <TableCell className="text-right">{candidate.age}</TableCell>
                                    <TableCell className="text-right">{candidate.votes}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default VotingPage