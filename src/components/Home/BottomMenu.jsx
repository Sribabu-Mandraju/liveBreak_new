import React from 'react'
import { FaHome} from "react-icons/fa";
import {  MdOutlineRocketLaunch } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { PiFoldersFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { name: "Home", icon: <FaHome />, path: "/" },
  { name: "Feed", icon: <MdInsertComment />, path: "/feed" },
  { name: "Local", icon: <PiFoldersFill />, path: "/local" },
  { name: "Groups", icon: <FaUserGroup />, path: "/group" },
  { name: "V Clips", icon: <IoVideocam />, path: "/vclips" },
  
  
];
const BottomMenu = () => {
  const [active,setActive]=useState("Home");
  return (
    <div  className="fixed border-t border-gray-400 dark:border-gray-800 bottom-0 left-0 z-[2] right-0  bg-white dark:bg-gray-900 flex justify-around items-center p-2 md:hidden shadow-md">
    {menuItems.slice(0, 5).map((item, index) => (
      <Link key={index} to={item.path} className={`  ${active===item.name ? "text-blue-500" : "dark:text-gray-300 text-gray-600 "} `} onClick={()=> setActive(item.name)}>
        <div className="flex flex-col justify-center items-center">
        <span className="text-[25px]">{item.icon}</span>
        <span className="text-[12px]">{item.name}</span>
        </div>
      </Link>
    ))}
  </div>
  )
}

export default BottomMenu