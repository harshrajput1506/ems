import React from 'react';

interface HelloProps {
  userRole: 'admin' | 'voter';
  userName: string;
}

const Hello: React.FC<HelloProps> = ({ userRole, userName }) => {
  const date = new Date();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all w-full">
      <div className="flex justify-between h-14 px-8 items-center border-b border-zinc-200">
        <div className="flex z-40 font-semibold text-lg">
          <h1>{userRole === 'admin' ? 'Hello Admin.' : `Hello ${userName}.`}</h1>
        </div>

        <div className="flex z-40 text-sm">{date.toLocaleDateString()}</div>
      </div>
    </nav>
  );
};

export default Hello;
