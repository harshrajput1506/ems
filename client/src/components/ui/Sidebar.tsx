import  { useState, useEffect, useRef } from 'react';
import dashboardIcon from "../../assets/images/dashboard.svg";
import VoteIcon from "../../assets/images/vote1.svg";
import Result from '../../assets/images/result.svg'
import addElectionIcon from "../../assets/images/election-event.svg";
// import { useLocation } from 'react-router-dom';

const adminItems = [
  { name: 'Dashboard', Ref: '/admin/dashboard' , ImgSrc:dashboardIcon  },
  { name: 'Create Election', Ref: '/admin/add-election' , ImgSrc:addElectionIcon  },
  // { name: 'Create Elections', label: 'About' , Imgsrc:addElectionIcon },
  // { name: 'Voting Result', Ref: '/admin/add-election' , ImgSrc:dashboardIcon  },
  { name: 'Publish Result', Ref: '/admin/publish-result' , ImgSrc:dashboardIcon  },
];


const userItems = [
  { name: 'Dashboard', Ref: '/user/dashboard' , ImgSrc:dashboardIcon  },
  { name: 'Voting', Ref: '/user/voting' , ImgSrc:VoteIcon  },
  // { name: 'Create Elections', label: 'About' , Imgsrc:addElectionIcon },
  // { name: 'Voting Result', Ref: '/admin/add-election' , ImgSrc:dashboardIcon  },
  { name: 'Voting Result', Ref: '/user/results' , ImgSrc:Result  },
  { name: 'KYV', Ref: '/user/Know-your-voter' , ImgSrc:Result  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const [selected, setSelected] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    return (
      <>

      {isMobile ?
          <>
          <div className="burger-icon" onClick={toggleSidebar}>
            {/* Burger Icon */}
            <span className="text-2xl">☰</span>
          </div>
          <div ref={sidebarRef} className={`z-50 fixed h-screen w-1/2 top-0 left-0 w-2/12 bg-black text-white p-4 h-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {
              isOpen?<nav className=" space-y-6 mt-8 ">
                <div className="flex items-center my-6 ml-4">
              <span className="font-semibold text-xl">EMS Dashboard</span>
            </div>
              {location.pathname === "/admin/add-election" || location.pathname === "/admin/publish-result" || location.pathname === "/admin/dashboard" ? (
                <div>
                  {adminItems.map((item) => (
                    <div key={item.name} onClick={() => setSelected(item.name)} className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>
                      <img src={item.ImgSrc} alt="icon" className="h-7 w-7 mr-2 fill-white" />
                      <a href={item.Ref} className="block text-gray-300 hover:text-white">{item.name}</a>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {userItems.map((item) => (
                    <div key={item.name} onClick={() => setSelected(item.name)} className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>
                      <img src={item.ImgSrc} alt="icon" className="h-7 w-7 mr-2 fill-white" />
                      <a href={item.Ref} className="block text-gray-300 hover:text-white">{item.name}</a>
                    </div>
                  ))}
                </div>
              )}
            </nav>:<div></div>
            }
            
          </div>
        </>
      :
      <div className= " w-2/12 bg-black text-white p-4 static h-auto ">
        {/* Top Section: Logo & User */}
        <div className="flex items-center my-6 ml-4">
          <span className="font-semibold text-xl">EMS Dashboard</span>
        </div>
        <nav className="space-y-6 mt-8">
          {location.pathname === "/admin/add-election" || location.pathname === "/admin/publish-result" ||  location.pathname === "/admin/dashboard"?
          <div>
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
          </div>:
          
          <div>
              {userItems.map((item) => (

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
        
        </div>}
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
      </div>}

      </>
    );
  }

  export default Sidebar
  