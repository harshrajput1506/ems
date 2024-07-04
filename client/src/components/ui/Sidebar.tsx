import { useState, useEffect, useRef } from "react";
import dashboardIcon from "../../assets/images/dashboard.svg";
import VoteIcon from "../../assets/images/vote1.svg";
import Result from "../../assets/images/result.svg";
import addElectionIcon from "../../assets/images/election-event.svg";
import publishResult from "../../assets/images/arrow-up-right-svgrepo-com.svg";
import KnowyourVOter from "../../assets/images/arrows-vertical-svgrepo-com.svg";
// import { useLocation } from 'react-router-dom';
const isAdminPath = location.pathname.startsWith("/admin");
console.log(isAdminPath, "sadsd");
const adminItems = [
  { name: "Dashboard", Ref: "/admin/dashboard", ImgSrc: dashboardIcon },
  {
    name: "Create Election",
    Ref: "/admin/add-election",
    ImgSrc: addElectionIcon,
  },
  // { name: 'Create Elections', label: 'About' , Imgsrc:addElectionIcon },
  // { name: 'Voting Result', Ref: '/admin/add-election' , ImgSrc:dashboardIcon  },
  {
    name: "Publish Result",
    Ref: "/admin/publish-result",
    ImgSrc: publishResult,
  },
];

const userItems = [
  { name: "Dashboard", Ref: "/user/dashboard", ImgSrc: dashboardIcon },
  { name: "Voting", Ref: "/user/voting", ImgSrc: VoteIcon },
  // { name: 'Create Elections', label: 'About' , Imgsrc:addElectionIcon },
  // { name: 'Voting Result', Ref: '/admin/add-election' , ImgSrc:dashboardIcon  },
  { name: "Voting Result", Ref: "/user/results", ImgSrc: Result },
  { name: "KYV", Ref: "/user/Know-your-voter", ImgSrc: KnowyourVOter },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selected, setSelected] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <div className="burger-icon" onClick={toggleSidebar}>
            {/* Burger Icon */}
            <span className="text-2xl">☰</span>
          </div>
          <div
            ref={sidebarRef}
            className={`z-50 fixed h-screen w-1/2 top-0 left-0  bg-black text-white p-4 h-auto transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {isOpen ? (
              <nav className=" space-y-6 mt-8 ">
                <div className="flex items-center my-6 ml-4">
                  <span className="font-semibold text-xl">EMS Dashboard</span>
                </div>

                {location.pathname.startsWith("/admin/") ? (
                  <div>
                    {adminItems.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => setSelected(item.name)}
                        className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? "bg-cyan-900" : "hover:bg-gray-700"}`}
                      >
                        <img
                          src={item.ImgSrc}
                          alt="icon"
                          className="h-7 w-7 mr-2 fill-white"
                        />
                        <a
                          href={item.Ref}
                          className="block text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                    <div className="flex flex-col">
                      <button className="cursor-pointer group relative flex mb-3 text-center gap-1.5 px-8 py-2 m-2 bg-gray-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
          >
            <g strokeWidth={0} id="SVGRepo_bgCarrier" />
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Interface / Download">
                {" "}
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                  stroke="#f1f1f1"
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                  id="Vector"
                />{" "}
              </g>{" "}
            </g>
          </svg> */}
                        Logout
                      </button>
                      <a
                        className="flex flex-row border-t-2 hover:bg-gray-70 cursor-pointer pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 "
                        href="/user/profile"
                      >
                        <div className="mt-1 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                          <svg
                            className="absolute w-12 h-12 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="m-4 text-bold text-xl">{` User`}</div>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    {userItems.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => setSelected(item.name)}
                        className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? "bg-cyan-900" : "hover:bg-gray-700"}`}
                      >
                        <img
                          src={item.ImgSrc}
                          alt="icon"
                          className="h-7 w-7 mr-2 fill-white"
                        />
                        <a
                          href={item.Ref}
                          className="block text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                    <div className="flex flex-col">
                      <button className="cursor-pointer group relative flex mb-3 text-center gap-1.5 px-8 py-2 m-2 bg-gray-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
          >
            <g strokeWidth={0} id="SVGRepo_bgCarrier" />
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Interface / Download">
                {" "}
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                  stroke="#f1f1f1"
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                  id="Vector"
                />{" "}
              </g>{" "}
            </g>
          </svg> */}
                        Logout
                      </button>
                      <a
                        className="flex flex-row border-t-2 hover:bg-gray-70 cursor-pointer pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 "
                        href="/user/profile"
                      >
                        <div className="mt-1 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                          <svg
                            className="absolute w-12 h-12 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="m-4 text-bold text-xl">{` User`}</div>
                      </a>
                    </div>
                  </div>
                )}
              </nav>
            ) : (
              <div></div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-col justify-between flex w-2/12 bg-black text-white p-4 static sticky">
          {/* Top Section: Logo & User */}
          <div className="flex flex-col    ">
            <span className="font-semibold text-xl my-6 ml-4 items-center">
              EMS Dashboard
            </span>

            <nav className="space-y-6 mt-8">
              {location.pathname.startsWith("/admin/") ? (
                <div>
                  {adminItems.map((item) => (
                    <div
                      onClick={() => setSelected(item.name)}
                      className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? "bg-cyan-900" : "hover:bg-gray-700"}`}
                    >
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
                </div>
              ) : (
                <div>
                  {userItems.map((item) => (
                    <div
                      onClick={() => setSelected(item.name)}
                      className={`flex flex-row items-center justify-start p-4 ${selected === item.name ? "bg-cyan-900" : "hover:bg-gray-700"}`}
                    >
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
                </div>
              )}
            </nav>
          </div>

          <div className="flex flex-col">
            <button className="cursor-pointer group relative flex mb-3 text-center gap-1.5 px-8 py-2 m-2 bg-gray-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
              {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
          >
            <g strokeWidth={0} id="SVGRepo_bgCarrier" />
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Interface / Download">
                {" "}
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                  stroke="#f1f1f1"
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                  id="Vector"
                />{" "}
              </g>{" "}
            </g>
          </svg> */}
              Logout
            </button>
            <a
              className="flex flex-row border-t-2 hover:bg-gray-70 cursor-pointer pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 "
              href="/user/profile"
            >
              <div className="mt-1 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="m-4 text-bold text-xl">{` User`}</div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
