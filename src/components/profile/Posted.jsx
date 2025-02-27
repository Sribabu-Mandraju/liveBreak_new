import {React,useState} from 'react'

const Posted = () => {
    const [activeTab, setActiveTab] = useState("My News");
  return (
    <div>
        {/* Tabs Section */}
      <div className="mt-6 w-full  border-gray-300 dark:border-gray-700 flex overflow-x-auto ">
            {["My News","My ADs"].map((tab) => (
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
            {activeTab === "My News" && <div>My News </div>}
            {activeTab === "My ADs" && <div>My ADs</div>}
            
          </div>

    </div>
  )
}

export default Posted