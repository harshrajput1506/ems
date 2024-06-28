import  { useState } from 'react';
import dashboardIcon from "../../assets/images/dashboard.svg";
import addElectionIcon from "../../assets/images/election-event.svg";

const adminItems = [
  { name: 'Dashboard', Ref: '/admin/dashboard' , ImgSrc:dashboardIcon  },
  { name: 'Create Election', Ref: '/admin/add-election' , ImgSrc:addElectionIcon  },
  // { name: 'Create Elections', label: 'About' , Imgsrc:addElectionIcon },
  // { name: 'Voting Result', Ref: '/admin/add-election' , ImgSrc:dashboardIcon  },
  { name: 'Publish Result', Ref: '/admin/publish-result' , ImgSrc:dashboardIcon  },
];

function Sidebar() {
  const [selected, setSelected] = useState('');
    return (
      <div className= " w-2/12 bg-black text-white p-4 static h-auto ">
        {/* Top Section: Logo & User */}
        <div className="flex items-center my-6 ml-4">
          <span className="font-semibold text-xl">EMS Dashboard</span>
        </div>
        <nav className="space-y-6 mt-8">
        {adminItems.map((item) => (

              <div onClick={() => setSelected(item.name)} className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>

              <img
                src={item.ImgSrc}
                alt="icon"
                className="h-7 w- mr-2 fill-white"
              />
              <a
                href={item.Ref}
                className="block text-gray-300 hover:text-white"
              >
                {item.name}
              </a>
              </div>
        ))}
        {/* Navigation Links */}
        
          


          {/* <div className="flex flex-row items-center justify-start">
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
              Voting Result
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
              Publish Result
            </a>
          </div> */}

          {/* <a href="/results" className="block text-gray-300 hover:text-white">results</a> */}
          {/* ... add more links as needed ... */}
        </nav>
      </div>
    );
  }

  export default Sidebar
  