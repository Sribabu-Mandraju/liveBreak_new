import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaBell, FaEnvelope, FaUser, FaEllipsisH } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdVerified, MdOutlineRocketLaunch } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { useTheme } from "../../providers/ThemeProvider";

const menuItems = [
  { name: "Home", icon: <FaHome />, path: "#" },
  { name: "Explore", icon: <FaSearch />, path: "#" },
  { name: "Notifications", icon: <FaBell />, path: "#" },
  { name: "Messages", icon: <FaEnvelope />, path: "#" },
  { name: "Grok", icon: <MdOutlineRocketLaunch />, path: "#" },
  { name: "Communities", icon: <IoPeopleSharp />, path: "#" },
  { name: "Premium", icon: <MdVerified />, path: "#" },
  { name: "Verified Orgs", icon: <MdVerified />, path: "#" },
  { name: "Profile", icon: <FaUser />, path: "#" },
  { name: "More", icon: <FaEllipsisH />, path: "#" },
];

const SideMenu = () => {
  const { theme, toggleTheme } = useTheme();
  // console.log("Mobile Menu Items:", menuItems.slice(0, 5));


  return (
    <>
      {/* Desktop Side Menu */}
      <div className="hidden md:flex h-[calc(100vh-70px)] w-64 px-4 py-6 flex-col justify-between transition-all duration-300">
        <div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-1">
                <a
                  href={item.path}
                  className="flex items-center gap-4 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-full flex items-center justify-center gap-2">
            <BsFillPenFill />
            Post
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mt-5">
            <img
              src="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
              alt="User"
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Sribabu Mandraju</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">@5R1B4BU</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      
    </>
  );
};

export default SideMenu;
