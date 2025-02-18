import React, { useState, useEffect, useRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import virat from "../../assets/virat.jpeg";

const InfiniteScroll = () => {
  const [toggle, setToggle] = useState(true);
  const scrollRef = useRef(null);

  const data = Array(20).fill({ name: "Sribabu", date: "12-09-2004" });

  useEffect(() => {
    let interval;
    if (toggle) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [toggle]);

  const handleMouseEnter = () => setToggle(false);
  const handleMouseLeave = () => setToggle(true);

  return (
    <div className="mt-5">
      <div className="flex justify-center items-center">
        <div className="w-[90%] md:h-[80px] h-[60px] rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg flex justify-center items-center bg-white dark:bg-gray-900 transition-colors duration-300">
          <div
            className="w-[98%] h-[80%] flex justify-center items-center rounded-md relative overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Play/Pause Button */}
            <div className="absolute top-0 right-0 text-white h-full rounded-r-lg w-[50px] bg-gray-800 dark:bg-gray-700 flex justify-center items-center cursor-pointer hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300">
              <button onClick={() => setToggle(!toggle)}>
                {toggle ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaPlay className="text-xl" />
                )}
              </button>
            </div>

            {/* Breaking News Badge */}
            <div className="absolute top-0 left-0 text-white h-full rounded-l-lg w-[130px] bg-orange-600 flex justify-center items-center gap-2">
              <div className="h-[35px] w-[35px] rounded-full flex justify-center items-center bg-white shadow-md">
                <BsFillLightningChargeFill className="text-orange-600 text-lg" />
              </div>
              <div className="text-white text-lg font-semibold">Breaking</div>
            </div>

            {/* Scrolling Content */}
            <div
              className="flex flex-row gap-10 scrollbar-hide"
              ref={scrollRef}
              style={{
                scrollBehavior: "smooth",
                overflowX: "hidden",
                whiteSpace: "nowrap",
                padding: "5px",
              }}
            >
              {data.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={virat}
                    className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600"
                    alt="profile"
                  />
                  <div className="flex flex-col">
                    <span className="text-black dark:text-white font-medium text-base">
                      {item.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
