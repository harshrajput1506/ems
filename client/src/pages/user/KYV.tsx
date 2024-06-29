import React, { useState, ChangeEvent, FormEvent } from 'react';
import Hello from '@/components/ui/hello'
import Sidebar  from '../../components/ui/Sidebar'

const KYV = () => {
    const [epicId, setEpicId] = useState<string>('');
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEpicId(event.target.value);
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      console.log('Submitted EPIC Id:', epicId);
    };



  return (
    <div className="min-h-screen flex flex-col w-dvw md:flex-row bg-gray-100">
    {/* Sidebar (Similar to the image you provided) */}
    <Sidebar />
    <div className="px-4 m-4 w-10/12">
      <div ><Hello /></div>

      <div className="mt-[20vh] flex items-center justify-center ">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Enter EPIC Id</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="epicId">
            EPIC Id
          </label>
          <input
            type="text"
            id="epicId"
            value={epicId}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your EPIC Id"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
      
    </div>
    </div>
  )
}

export default KYV