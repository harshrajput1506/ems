import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import dashboardIcon from "../../assets/images/dashboard.svg";
import VoteIcon from "../../assets/images/vote1.svg";
import Result from '../../assets/images/result.svg';
import addElectionIcon from "../../assets/images/election-event.svg";
import publishResult from "../../assets/images/arrow-up-right-svgrepo-com.svg";
import KnowyourVOter from "../../assets/images/arrows-vertical-svgrepo-com.svg";

const adminItems = [
  { name: 'Dashboard', Ref: '/admin/dashboard', ImgSrc: dashboardIcon },
  { name: 'Create Election', Ref: '/admin/add-election', ImgSrc: addElectionIcon },
  { name: 'Publish Result', Ref: '/admin/publish-result', ImgSrc: publishResult },
];

const userItems = [
  { name: 'Dashboard', Ref: '/user/dashboard', ImgSrc: dashboardIcon },
  { name: 'Voting', Ref: '/user/voting', ImgSrc: VoteIcon },
  { name: 'Voting Result', Ref: '/user/results', ImgSrc: Result },
  { name: 'KYV', Ref: '/user/Know-your-voter', ImgSrc: KnowyourVOter },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  
  const [selected, setSelected] = useState(location.pathname);

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

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <>
      {isMobile ? (
        <>
          <div className="burger-icon cursor-pointer flex p-4 transition duration-300 ease-in-out" onClick={toggleSidebar}>
            {/* Burger Icon */}
            <span className="text-2xl">☰</span>
          </div>
          <div ref={sidebarRef} className={`z-50 fixed h-screen w-1/2 bg-black text-white p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='flex flex-col h-full'>
              {isOpen ? (
                <nav className="space-y-6 mt-8">
                  <div className="flex items-center my-6 ml-4">
                    <span className="font-semibold text-xl">{isAdminPath ? 'EMS ADMIN' : 'EMS Dashboard'}</span>
                  </div>
                  {isAdminPath ? (
                    <div>
                      {adminItems.map((item) => (
                        <a href={item.Ref} key={item.name} onClick={() => setSelected(item.Ref)} className={`flex flex-row items-center justify-start p-4 ${selected === item.Ref ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>
                          <img src={item.ImgSrc} alt="icon" className="h-7 w-7 mr-2 fill-white" />
                          < div className="block text-gray-300 hover:text-white">{item.name}</div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {userItems.map((item) => (
                        <a href={item.Ref}key={item.name} onClick={() => setSelected(item.Ref)} className={`flex flex-row items-center justify-start p-4 ${selected === item.Ref ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>
                          <img src={item.ImgSrc} alt="icon" className="h-7 w-7 mr-2 fill-white" />
                          <div  className="block text-gray-300 hover:text-white">{item.name}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </nav>
              ) : null}
              <div className="flex-grow"></div>
              <div className='flex flex-col'>
                <button className="cursor-pointer group relative flex mb-3 text-center gap-1.5 px-8 py-2 m-2 bg-gray-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                  Logout
                </button>
                <a className='flex flex-row border-t-2 hover:bg-gray-70 cursor-pointer pt-4 mt-4 space-y-2 font-medium border-t border-gray-200' href='/user/profile'>
                  <div className="mt-1 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className='m-4 text-bold text-xl'>
                    {` User`}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='lg:w-2/12 bg-black text-white static sticky '>
          <div className="flex-col justify-between flex h-screen p-4 fixed lg:w-2/12">
            <div className="flex flex-col">
              <span className="font-semibold text-lg xl:text-xl my-6 ml-4">{isAdminPath ? 'EMS ADMIN' : 'EMS Dashboard'}</span>
              <nav className="space-y-6 mt-8">
                {isAdminPath ? (
                  <div>
                    {adminItems.map((item) => (
                      <a href={item.Ref} key={item.name} onClick={() => setSelected(item.Ref)} className={`flex flex-row items-center justify-start p-4 ${selected === item.Ref ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>
                        <img src={item.ImgSrc} alt="icon" className="xl:h-7 h-5 w- mr-2 fill-white" />
                        <div className="block text-gray-300 text-base xl:text-md hover:text-white">{item.name}</div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div>
                    {userItems.map((item) => (
                      <a href={item.Ref} key={item.name} onClick={() => setSelected(item.Ref)} className={`flex flex-row items-center justify-start p-4 ${selected === item.Ref ? 'bg-cyan-900' : 'hover:bg-gray-700'}`}>
                        <img src={item.ImgSrc} alt="icon" className="xl:h-7 h-5 w- mr-2 fill-white" />
                        <div className="block text-gray-300 text-base xl:text-md hover:text-white">{item.name}</div>
                      </a>
                    ))}
                  </div>
                )}
              </nav>
            </div>
            <div className='flex flex-col'>
              <button className="cursor-pointer group relative flex mb-3 xl:w-full px-2 w-1/2 text-center gap-1.5 xl:px-8 py-1 xl:py-2 m-2 bg-gray-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                Logout
              </button>
              <a className='flex flex-row border-t-2 hover:bg-gray-70 cursor-pointer pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 xl:w-full w-10/12' href='/user/profile'>
                <div className="mt-1 relative xl:w-10 xl:h-10 w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg className="absolute xl:w-12 xl:h-12 w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className='xl:m-4 m-2 text-bold xl:text-xl text-base'>
                  {` User`}
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
