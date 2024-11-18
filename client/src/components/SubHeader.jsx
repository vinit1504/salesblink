/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, Link } from "react-router-dom";

import {
  FaRegEnvelope,
  FaListAlt,
  FaTasks,
  FaRegChartBar,
  FaRegFileAlt,
  FaCogs,
} from "react-icons/fa";
import { VscSend } from "react-icons/vsc";


const SubHeader = () => {
  // Get the current pathname
  const location = useLocation();

  // Define the tabs and their corresponding icons and paths
  const tabs = [
    { name: "Sequence", icon: <VscSend  className="w-5 h-5 font-bold"/>, path: "/outreach" },
    { name: "Outbox", icon: <FaTasks />, path: "/outreach/outbox" },
    { name: "List", icon: <FaListAlt />, path: "/outreach/list" },
    { name: "Task", icon: <FaTasks />, path: "/outreach/task" },
    { name: "Reports", icon: <FaRegChartBar />, path: "/outreach/reports" },
    { name: "Templates", icon: <FaRegFileAlt />, path: "/outreach/templates" },
    {
      name: "Email Sender",
      icon: <FaRegEnvelope />,
      path: "/outreach/email-sender",
    },
    { name: "Settings", icon: <FaCogs />, path: "/outreach/settings" },
  ];

  const renderContent = () => {
    const path = location.pathname; 

    if (path.includes("/outreach")) {
      return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <ul className="flex space-x-6">
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                  path === tab.path
                    ? "bg-gray-300 text-black" // Active state background color
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span className="flex-shrink-0">{tab.icon}</span>
                <Link to={tab.path} className="text-gray-700 font-medium">
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (path.includes("/inbox")) {
      return (
        <div>
          <h2>Inbox Tab</h2>
        </div>
      );
    } else if (path.includes("/meet")) {
      return (
        <div>
          <h2>Meet Tab</h2>
        </div>
      );
    }else if (path.includes("/dashboard")) {
      return (
        <div>
          <h2>dashboard Tab</h2>
        </div>
      );
    } 
    else {
      return (
        <div>
          
        </div>
      );
    }
  };

  return <div className=" px-6 hidden xs:block">{renderContent()}</div>;
};

export default SubHeader;
