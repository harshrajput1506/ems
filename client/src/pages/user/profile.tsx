import React, { useState } from 'react';
import Hello from '@/components/ui/hello'
import Sidebar  from '../../components/ui/Sidebar';


const UserProfile: React.FC = () => {
  const [user] = useState({
    name: 'John Doe',
    voterId: 'ABC123XYZ',
    constituency: 'District 1',
    age: 30,
    phoneNumber: '+1234567890'
  });

  return (
    <div className="min-h-screen flex flex-col w-dvw md:flex-row bg-gray-100">
    {/* Sidebar (Similar to the image you provided) */}
    <Sidebar />
    <div className="px-4 m-4 w-10/12">
      <div ><Hello /></div>

      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-800"><strong>Name:</strong> {user.name}</p>
        <p className="text-gray-800"><strong>Voter ID:</strong> {user.voterId}</p>
        <p className="text-gray-800"><strong>Constituency:</strong> {user.constituency}</p>
        <p className="text-gray-800"><strong>Age:</strong> {user.age}</p>
        <p className="text-gray-800"><strong>Phone Number:</strong> {user.phoneNumber}</p>
      </div>
    </div>
      
    </div>
    </div>
    
  );
};

export default UserProfile;
