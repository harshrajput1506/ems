import React, { useState, ChangeEvent, FormEvent } from 'react';
import Hello from '@/components/ui/hello'
import Sidebar  from '../../components/ui/Sidebar';
import userData from './users.json';


interface User {
  name: string;
  age: number;
  constituency: string;
  address: string;
}

const KYV = () => {
  const [epicId, setEpicId] = useState<string>('');
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [error, setError] = useState<string>('');

    const handleEpicIdChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEpicId(event.target.value);
      setError('');
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const user = userData.find(user => user.epicId === epicId);
      if (user) {
        setUserDetails(user);
        setError('');
      } else {
        setUserDetails(null);
        setError('EPIC ID not found. Please check and try again.');
      }}



  return (
    <div className="min-h-screen flex flex-col w-dvw md:flex-row bg-gray-100">
    {/* Sidebar (Similar to the image you provided) */}
    <Sidebar />
    <div className="px-4 m-4 w-10/12">
      <div ><Hello /></div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Verify EPIC ID</h2>
        {userDetails ? (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">User Details</h3>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Age:</strong> {userDetails.age}</p>
            <p><strong>Constituency:</strong> {userDetails.constituency}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="epicId" className="block text-gray-700 font-medium mb-2">
                EPIC ID
              </label>
              <input
                type="text"
                id="epicId"
                value={epicId}
                onChange={handleEpicIdChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
      
    </div>
    </div>
  )
}

export default KYV;