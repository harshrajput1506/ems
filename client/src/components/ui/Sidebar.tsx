import dashboardIcon from "../../assets/images/dashboard.svg";
import addElectionIcon from "../../assets/images/election-event.svg";

function Sidebar() {
    return (
      <div className="w-64 bg-gray-800 text-white p-4 h-auto md:h-screen ">
        {/* Top Section: Logo & User */}
        <div className="flex items-center mb-8">
          <span className="font-semibold text-lg">EMS Dashboard</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <div className="flex flex-row items-center justify-start">

            <img
              src={dashboardIcon}
              alt="dashboard icon"
              className="h-7 w-7 mr-2 fill-white"
            />
            <a
              href="/admin/dashboard"
              className="block text-gray-300 hover:text-white"
            >
              Dashboard
            </a>
          </div>
          <div className="flex flex-row items-center justify-start">
            <img
              src={addElectionIcon}
              alt="election icon"
              className="h-5, w-5 mr-2"
            />
            <a
              href="/admin/add-election"
              className="block text-gray-300 hover:text-white"
            >
              Add Election
            </a>
          </div>

          {/* <a href="/results" className="block text-gray-300 hover:text-white">results</a> */}
          {/* ... add more links as needed ... */}
        </nav>
      </div>
    );
  }

  export default Sidebar
  