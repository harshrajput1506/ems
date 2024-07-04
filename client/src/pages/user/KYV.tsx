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
    <div className="px-4 m-4 sm:w-10/12 w-ull">
      <div ><Hello /></div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="sm:p-6 p-2 w-full bg-white rounded-lg shadow-lg w-96">
        
        {userDetails ? (
          <div className="mt-6">
            <h3 className="sm:text-xl font-bold mb-2">User Details</h3>
            <p className='text-sm sm:text-base'><strong>Name:</strong> {userDetails.name}</p>
            <p className='text-sm sm:text-base'><strong>Age:</strong> {userDetails.age}</p>
            <p className='text-sm sm:text-base'><strong>Constituency:</strong> {userDetails.constituency}</p>
            <p className='text-sm sm:text-base'><strong>Address:</strong> {userDetails.address}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <h2 className="sm:text-2xl text-base font-bold mb-4">Verify Voter ID</h2>
              <label htmlFor="epicId" className="block text-gray-700 sm:font-medium mb-2">
                VOTER ID
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