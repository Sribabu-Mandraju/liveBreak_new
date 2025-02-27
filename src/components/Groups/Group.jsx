import React from "react";
import Slider from "./Slider";
const Group = () => {
  return (
    <div className="relative w-full  md:max-w-7xl mx-auto container min-h-screen flex gap-4 dark:text-[#1189F6]">
      <div className="flex flex-col items-center bg-white  dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        <div className="  bg-blue-500 w-[90%] rounded-lg mt-6 flex justify-center items-center text-white">
          <button className="py-1 px-4 font-semibold text-lg ">Create your own Group</button>
        </div>
        <div className="flex flex-col mt-6 w-full">
            <div className="text-lg font-semibold   text-blue-800">Suggested for you</div>
            <div className="border-b border-2 border-blue-500 w-10 mt-2 mb-6"></div>
            <Slider/>

        </div>
        <div className="flex flex-col mt-6 w-full">
            <div className="text-lg font-semibold   text-blue-800">Your Feed</div>
            <div className="border-b border-2 border-blue-500 w-10 mt-1 mb-6"></div>
            

        </div>
      </div>
    </div>
  );
};

export default Group;
