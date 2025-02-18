"use client"

import { useState } from "react"

const Trending = () => {
  const [activeTab, setActiveTab] = useState("foryou")

  const trendingTopics = [
    {
      title: "Khloé in Wonder Land",
      category: "LIVE",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png",
    },
    { title: "#ArrestKhusbuPandey", category: "Trending in India", posts: "5,894" },
    { title: "Suhaag Raat", category: "Trending in India", posts: "3,003" },
    { title: "Afghanistan", category: "Politics · Trending", posts: "69.1K" },
    { title: "#Chhaava 🐎", category: "Entertainment · Trending", posts: "46.9K" },
  ]

  const whoToFollow = [
    {
      name: "John Doe",
      handle: "@johndoe",
      avatar: "https://meebuddy.com/assets/img/meebuddy/slider/2.png",
    },
    {
      name: "Jane Smith",
      handle: "@janesmith",
      avatar: "https://meebuddy.com/assets/img/meebuddy/slider/2.png",
    },
    {
      name: "Tech News",
      handle: "@technews",
      avatar: "https://meebuddy.com/assets/img/meebuddy/slider/2.png",
    },
  ]

  return (
    <aside className="hidden md:block w-full h-screen overflow-y-auto p-4 bg-white dark:bg-black border-l border-gray-300 dark:border-gray-700">
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 pl-12 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.61 0 7.5 7.5 0 0 0 10.61 0z"
          ></path>
        </svg>
      </div>

      {/* Get Verified Section */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Verified</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3">Subscribe to unlock new features.</p>
        <button className="bg-black dark:bg-white text-white dark:text-black font-bold py-2 px-4 rounded-full hover:bg-opacity-80 transition duration-200">
          Get Verified
        </button>
      </div>

      {/* What's Happening Section */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's happening</h2>

        {/* Tabs */}
        <div className="flex mb-4 border-b border-gray-300 dark:border-gray-700">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "foryou"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("foryou")}
          >
            For you
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "trending"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </button>
        </div>

        {/* Trending Topics */}
        {trendingTopics.map((topic, index) => (
          <div
            key={index}
            className="mb-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition"
          >
            {topic.image ? (
              <div className="flex items-center gap-3">
                <img
                  src={topic.image || "/placeholder.svg"}
                  alt={topic.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{topic.category}</p>
                  <p className="text-gray-900 dark:text-white font-semibold">{topic.title}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{topic.category}</p>
                <p className="text-gray-900 dark:text-white font-semibold">{topic.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{topic.posts} posts</p>
              </div>
            )}
          </div>
        ))}

        {/* Show More */}
        <button className="mt-2 text-blue-500 hover:underline text-sm font-medium">Show more</button>
      </div>

      {/* Who to Follow Section */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Who to follow</h2>
        {whoToFollow.map((user, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">{user.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.handle}</p>
              </div>
            </div>
            <button className="bg-black dark:bg-white text-white dark:text-black text-sm font-bold py-1 px-4 rounded-full hover:bg-opacity-80 transition duration-200">
              Follow
            </button>
          </div>
        ))}
        <button className="mt-2 text-blue-500 hover:underline text-sm font-medium">Show more</button>
      </div>
    </aside>
  )
}

export default Trending

