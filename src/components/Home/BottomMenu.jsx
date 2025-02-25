import React from 'react'
import { FaHome} from "react-icons/fa";
import {  MdOutlineRocketLaunch } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { PiFoldersFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";

const menuItems = [
  { name: "Home", icon: <FaHome />, path: "#" },
  { name: "Feed", icon: <MdInsertComment />, path: "#" },
  { name: "Local", icon: <PiFoldersFill />, path: "#" },
  { name: "Groups", icon: <FaUserGroup />, path: "#" },
  { name: "V Clips", icon: <IoVideocam />, path: "#" },
  
  
];
const BottomMenu = () => {
  return (
    <div  className="fixed border-t border-gray-400 dark:border-gray-800 bottom-0 left-0 z-[9999] right-0  bg-white dark:bg-gray-900 flex justify-around items-center p-2 md:hidden shadow-md">
    {menuItems.slice(0, 5).map((item, index) => (
      <a key={index} href={item.path} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
        <div className="flex flex-col justify-center items-center">
        <span className="text-[25px]">{item.icon}</span>
        <span className="text-[12px]">{item.name}</span>
        </div>
      </a>
    ))}
  </div>
  )
}

export default BottomMenu