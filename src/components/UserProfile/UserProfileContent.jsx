import { useState, useEffect } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from "axios";
import NewsCard from "../News/NewsCard";
import { useSelector } from "react-redux";
import PostCard from './Posts/PostCard'
const UserProfileContent = ({ data }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const [activeTab, setActiveTab] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      if (!data) return;
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/common/getReporterData`,
          {
            news_user_id: data,
            version: "new",
          }
        );
        setUser(response.data?.data || {});
      } catch (error) {
        console.error("Error in fetching user:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [data, BASE_URL]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!data) return;
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/common/feed `, {
          post_id: "",
          last_id: "",
          type: "",
          bookmarks: false,
          tag_id: "",
          posted_by: data,
          isReporter: true,
          version: "new",
        });
        setUserPosts(response.data?.data || {});
      } catch (error) {
        console.error("Error in fetching user posts:", error);
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [data, BASE_URL]);

  const userDetails = user?.details || {};
  const userStats = user?.stats || {};

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
    <div className="relative w-full md:max-w-7xl mx-auto container min-h-screen flex gap-4">
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        {/* Header Section */}
        <div className="flex flex-row bg-white px-4 items-center sticky top-0 dark:bg-gray-900 z-20 transition-transform duration-500">
          <div className="text-blue-500 text-4xl">
            <IoArrowBackCircle />
          </div>
          <div
            className={`flex flex-col px-4 py-2 duration-300 ${
              isScrolled ? "translate-x-16" : "translate-x-0"
            }`}
          >
            <h1 className="text-lg sm:text-lg font-semibold">
              <span className="sm:hidden">
                {userDetails?.user?.name.slice(0, 12) || "Unknown User"}...
              </span>
              <span className="hidden sm:inline">
                {userDetails?.user?.name || "Unknown User"}
              </span>
            </h1>
            <h1 className="text-sm text-gray-500">
              {userDetails?.reporter_type || "Unknown Type"}
            </h1>
          </div>
        </div>

        {/* Cover and Avatar */}
        <div className="relative bg-gray-100 dark:bg-gray-800">
          <img src={"/default-avatar.png"} className="h-40 sm:h-56 w-full" />
          <img
            src={userDetails?.user?.profile_icon || "/default-avatar.png"}
            alt="Avatar"
            style={{
              width: avatarSize,
              height: avatarSize,
              transform: `scale(${
                isScrolled ? 0.75 : 1
              }) translateY(-${translateY}px) translateX(${translateX}px)`,
              transition: "transform 0.5s ease, box-shadow 0.5s ease",
            }}
            className={`border-4 border-black z-30 rounded-full ${
              isScrolled ? "fixed top-0 ml-14" : "absolute -bottom-16 mx-6"
            }`}
          />
        </div>

        {/* Profile Info */}
        <div className="p-4 sm:p-8 mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1  w-full">
              <div className="flex flex-row  w-full items-center gap-2">
                <div className="text-xl   sm:text-xl font-semibold ">
                  {userDetails?.user?.name || "Unknown User"}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-gray-500"> {userStats?.posted || 0} Posts</p>
                <p className="mt-2 text-gray-500">
                  {userStats?.verified || 0} verified{" "}
                </p>
                <p className="mt-2 text-gray-500">
                  {userStats?.rejected || 0} rejected{" "}
                </p>

                <div></div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-6  border-gray-300 dark:border-gray-700 flex overflow-x-auto ">
            {["Home", "Add News", "Posted News", "Top 10"].map((tab) => (
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

          <div className="flex flex-col gap-2 min-h-screen">
            <div>
              <div className="text-lg font-semibold   text-blue-800">Posts</div>
              <div className="border-b border-2 border-blue-500 w-10 mt-1 mb-6"></div>
            </div>
            <div >
              <PostCard data={data}/>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContent;
