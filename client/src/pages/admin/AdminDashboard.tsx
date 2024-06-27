import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
  
  interface Election {
    id: string;
    constituency: string;
    date: Date;
    candidates: { name: string; party: string; age: number }[];
  }
  
  function AdminDashboard() {
    const [elections, setElections] = useState<Election[]>([]);
    const [showCreateElection, setShowCreateElection] = useState(false);
  
    const handleCreateElection = () => {
      setShowCreateElection(true);
    };
  
    return (
      <div className="min-h-screen flex">
        {/* Sidebar (Similar to the image you provided) */}
        <Sidebar/>
  
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Hello, Admin</h1>
            <div className="flex items-center">
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                  <AvatarImage src="/images/profile.svg" alt="User avatar"/>
                  <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
  
          {/* Elections List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elections.map((election) => (
              <Card key={election.id}>
                <CardHeader className="font-bold">
                  {election.constituency}
                </CardHeader>
                <CardContent>
                  {/* ... election details ... */}
                </CardContent>
              </Card>
            ))}
          </div>
  
          {/* Create Election Button */}
          <Button onClick={handleCreateElection} className="mt-4">
            Create New Election
          </Button>
  
          {/* Create Election Form (Initially Hidden) */}
          {showCreateElection && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Create Election</h2>
              <Input type="text" placeholder="Constituency" />
              {/* ... other form fields for election details ... */}
            </div>
          )}
        </div>
      </div>
    );
  }

  export default AdminDashboard
  