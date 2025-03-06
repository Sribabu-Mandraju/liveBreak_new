import React, { useState } from "react";
import Slider from "./Slider";
import axios from "axios";
import { Link } from "react-router-dom";
import Drawer from '../shadcnui/Drawer'
import { useSelector } from "react-redux";
import { SiWhatsapp } from "react-icons/si";
import { FaRegShareFromSquare } from "react-icons/fa6";
const Group = () => {
  const user = useSelector((state) => state.user);
  const [isCreate,setIsCreate]=useState(false);
  return (
    <div className="relative w-full  md:max-w-7xl mx-auto container min-h-screen flex gap-4 dark:text-[#1189F6]">
      <div className="flex flex-col items-center bg-white  dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        <div className="  bg-blue-500 w-[90%] rounded-lg mt-6 flex justify-center items-center text-white">
          <button className="py-1 px-4 font-semibold text-lg " onClick={()=>setIsCreate(true)}>Create your own Group</button>
          {
            isCreate && (
              <Drawer open={isCreate}
              onOpenChange={setIsCreate}
              title="Contact us for creating communities.">
                <div className="flex flex-col gap-2 p-4">
                  
                  <div className="flex flex-col gap-4 mt-6 ">
                    <div className="flex flex-row justify-around">
                    <div className="flex flex-row items-center gap-4">
                      <SiWhatsapp className="text-green-600"/>
                      Whats app
                    </div>
                    <div>
                      <FaRegShareFromSquare/>

                    </div>
                    </div>
                    <div className="text-gray-400">
                    At the moment we are only allowing Political parties and Educational Institutes.
                    </div>

                  </div>

                </div>

              </Drawer>
            )
          }
        </div>
        <div className="flex flex-col mt-6 w-full">
            <div className="text-lg font-semibold   text-blue-800">Suggested for you</div>
            <div className="border-b border-2 border-blue-500 w-10 mt-2 mb-2"></div>
            <div className="text-blue-700  cursor-pointer flex px-6 py-1 justify-end">See all</div>
            <Slider/>

        </div>
        <div className="flex flex-col mt-6 w-full">
            <div className="text-lg font-semibold   text-blue-800">Your Feed</div>
            <div className="border-b border-2 border-blue-500 w-10 mt-1 mb-6"></div>
            {
              !user?.user && (
                <div className="flex justify-center gap-6 items-center flex-col">
                  <div className="text-gray-500">Signin to see your feed.</div>
                  <Link to='/signin'><button className="flex rounded-lg bg-blue-600 text-white px-4 py-1 ">Signin</button></Link>
                </div>
              )
            }

        </div>
      </div>
    </div>
  );
};

export default Group;
