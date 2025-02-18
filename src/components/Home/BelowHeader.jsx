import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Navbar from "../Layouts/Navbar";
const BelowHeader = () => {
  const data = Array(14).fill({ date: "17-2-2026", topic: "hi guys what are you doing..." });
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; 
    }
  };

  return (
    
    <div className="mt-5 flex justify-center items-center">
      <div className="relative w-[97%] border border-black rounded-md overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-[50px] px-4 py-2 overflow-x-auto whitespace-nowrap"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-[10px] justify-center items-center min-w-[150px] relative">
              <div className="flex flex-row gap-[7px]">
                <div className="flex flex-col gap-[5px]">
              <div className="text-xs text-gray-500">{item.date}</div>
              <div className="text-sm text-black">{item.topic}</div>
              </div>
              <div className="h-[45px] w-[2px] bg-[black] text-[black]"></div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 rounded-full p-2 shadow-md"
        >
          <FaArrowRight className="text-black text-lg" />
        </button>
      </div>
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BelowHeader;
