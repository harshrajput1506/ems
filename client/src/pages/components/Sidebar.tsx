
function Sidebar() {
    return (
      <div className="w-64 bg-gray-800 text-white p-4 h-screen">
        {/* Top Section: Logo & User */}
        <div className="flex items-center mb-8">
          <span className="font-semibold text-lg">EMS Dashboard</span>
        </div>
  
        {/* Navigation Links */}
        <nav className="space-y-4">
          <a href="/dashboard" className="block text-gray-300 hover:text-white">Dashboard</a>
          <a href="/elections" className="block text-gray-300 hover:text-white">Elections</a>
          <a href="/candidates" className="block text-gray-300 hover:text-white">Candidates</a>
          {/* ... add more links as needed ... */}
        </nav>
      </div>
    );
  }

  export default Sidebar
  