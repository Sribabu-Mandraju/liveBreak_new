import {React,useState} from "react";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user);
   const [activeTab, setActiveTab] = useState("Messages For You");
  const count = [
    {
      title: "Total",
      num: 123456,
      color: "text-purple-600",
    },
    {
      title: "Pending",
      num: 678,
      color: "text-orange-400",
    },
    {
      title: "Verified",
      num: 890,
      color: "text-green-600",
    },
    {
      title: "Rejected",
      num: 123,
      color: "text-red-600",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-1 pb-4 items-center justify-center w-full h-36 bg-gray-200 dark:bg-gray-800">
        <div className="flex justify-center  text-white rounded-full w-10 h-10 items-center bg-blue-500 dark:bg-gray-900 dark:text-blue-600">
          {user?.user?.data?.email.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm">{user?.user?.data?.email}</div>
        <div className="text-sm">{user?.user?.data?.mobile_num}</div>
      </div>
      <div className="flex flex-row w-[95%] -mt-4 justify-evenly p-2 border dark:border-gray-800 rounded-lg border-gray-200 bg-white shadow-md dark:bg-gray-700 ">
        {count.map((data) => (
          <div className="flex flex-col items-center">
            <div className={` ${data.color} font-semibold`}>{data.title}</div>
            <div>{data.num}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center   mt-10">
        {/* News User */}
        <div className="flex flex-col ">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border border-green-600 flex items-center justify-center text-green-600">
              0
            </div>
            <div className="w-32 border-t border-green-600"></div>
          </div>
          <span className="mt-2 text-green-600">News User</span>
        </div>

        {/* Reporter */}
        <div className="flex flex-col ">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border border-green-600 flex items-center justify-center text-green-600">
              50
            </div>
            <div className="w-32 border-t border-green-600"></div>
          </div>
          <span className="mt-2 text-green-600">Reporter</span>
        </div>

        {/* Senior Reporter */}
        <div className="flex flex-col ">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border border-green-600 flex items-center justify-center text-green-600">
              200
            </div>
            {/* <div className="w-32 border-t border-green-600"></div> */}
          </div>
          <span className="mt-2 text-green-600">Senior Reporter</span>
        </div>
      </div>
      <div className="flex flex-row justify-evenly w-full mt-8">
        <button className="py-1 w-[20%] rounded-lg bg-blue-600 text-white dark:bg-gray-800">Add News</button>
        <button className="py-1 w-[20%] rounded-lg bg-blue-600 text-white dark:bg-gray-800">My News</button>
        <button className="py-1 w-[20%] rounded-lg bg-blue-600 text-white dark:bg-gray-800">ID Card</button>


      </div>
      <div className="flex flex-col text-sm py-3 dark:text-white text-blue-700 gap-1 w-[95%] mt-6 items-center justify-center p-2 border dark:border-gray-800 rounded-lg border-gray-200 bg-white shadow-md dark:bg-gray-700 ">
        <div className="text-lg">
          You are a Senior Reporter now!
        </div>
        <div>
          Go a head with Mee News!
        </div>
      </div>
      {/* Tabs Section */}
      <div className="mt-6 w-full  border-gray-300 dark:border-gray-700 flex overflow-x-auto ">
            {["Messages For You","Your Team"].map((tab) => (
              <button
                key={tab}
                className={`relative flex-1 px-4 py-2 text-center font-medium whitespace-nowrap duration-300 ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-500 z-1"></span>
                )}
                <span className="absolute bottom-0 left-0 w-full h-[1px] dark:bg-zinc-700 bg-zinc-400 z-0"></span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 h-auto">
            {activeTab === "Messages For You" && <div>Messages </div>}
            {activeTab === "Your Team" && <div>Your Team</div>}
            
          </div>
    </div>
  );
};

export default Home;
