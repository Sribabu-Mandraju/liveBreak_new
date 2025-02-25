import { useState, useEffect } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
import SideMenu from "../Home/SideMenu";
import Trending from "../Home/Trending";
import Layout from "../Layouts/Layout";
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Nakshatra Yeluri",
    username: "NakshatraYeluri",
    joined: "February 2025",
    following: 1,
    followers: 0,
    posts: 0,
    avatar: "https://via.placeholder.com/150",
  });

  const [activeTab, setActiveTab] = useState("posts");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avatar size with smooth transition
  const avatarSize = Math.max(68, 100 - scrollY * 0.5);
  const translateY = isScrolled ? 0 : Math.min(0, scrollY - 80);
  const translateX = isScrolled ? 0 : Math.min(0, scrollY - 100);

  return (
    <Layout>
    <div className="relative w-full  md:max-w-7xl mx-auto container min-h-screen flex gap-4">
     

      {/* Main Content */}
      <div className=" flex-1 bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-row bg-white px-4 items-center sticky top-0 dark:bg-gray-900 z-20 transition-transform duration-500">
          <div className="text-blue-500 text-4xl "><IoArrowBackCircle/></div>
          <div
            className={`flex flex-col px-4 py-2 duration-300 ${
               isScrolled ? "translate-x-16" : "translate-x-0"
            }`}
          >
            <h1 className="text-xl sm:text-2xl font-bold ">{profile.name}</h1>
            <h1 className="text-sm text-gray-500">Posts {profile.posts}</h1>
          </div>
        </div>

        {/* Banner and Avatar */}
        <div className="relative bg-gray-100 dark:bg-gray-800">
          <div className="h-40 sm:h-56 w-full"></div>
          <img
            src={profile.avatar}
            alt="Avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              transform: `scale(${isScrolled ? 0.75 : 1}) translateY(-${translateY}px) translateX(${translateX}px) `,
              
              transition: "transform 0.5s ease, box-shadow 0.5s ease",
            }}
            className={`border-4 border-black z-30 m-1/2  rounded-full 
              ${isScrolled?"fixed top-0 ml-14":"absolute -bottom-16 mx-6"} `}
          />
        </div>

        {/* Profile Info */}
        <div className="p-4 sm:p-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                  {profile.name}
                </h1>
                <button className="flex items-center px-3 sm:px-4 py-1 border-2 border-gray-600 space-x-2 text-xs sm:text-sm font-medium text-black bg-white rounded-full">
                  <FaCircleCheck className="text-blue-600 text-lg" />
                  <span>Get Verified</span>
                </button>
              </div>
              <p className="text-gray-500">@{profile.username}</p>
              <p className="mt-2 text-gray-500">📅 Joined {profile.joined}</p>
              <p className="mt-2">
                <span>{profile.following} Following</span> ·{" "}
                <span>{profile.followers} Followers</span>
              </p>
            </div>

            <button className="mt-4 sm:mt-0 flex w-fit items-center px-4 py-1 md:py-2 border-2 border-gray-600 space-x-2 text-sm font-medium text-black bg-white rounded-full">
              <FaEdit />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-300 dark:border-gray-700 pb-0 flex overflow-x-auto no-scrollbar">
            {[
              "Posts",
              "Replies",
              "Highlights",
              "Articles",
              "Media",
              "Likes",
            ].map((tab) => (
              <button
                key={tab}
                className={`flex-1 px-4 py-2 text-center font-medium whitespace-nowrap duration-300 ${
                  activeTab === tab.toLowerCase()
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-6 h-[60vh]">
            {activeTab === "posts" && <div>Posts</div>}
            {activeTab === "replies" && <div>Replies</div>}
            {activeTab === "highlights" && <div>Highlights</div>}
            {activeTab === "articles" && <div>Articles</div>}
            {activeTab === "media" && <div>Media</div>}
            {activeTab === "likes" && <div>Likes</div>}
          </div>
        </div>
      </div>
      </div>

     
    </Layout>
  );
};

export default Profile;
