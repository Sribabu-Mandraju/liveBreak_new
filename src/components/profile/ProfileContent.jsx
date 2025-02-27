import { useState, useEffect } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
import AddNewsForm from "./AddNewsForm";
import Home from './Home'
import Posted from "./Posted";
import { useSelector } from "react-redux";

const ProfileContent = () => {

  const user = useSelector((state) => state.user);
  console.log(user)
  const [profile, setProfile] = useState({
    name: "Sribabu Mandraju",
    email: "sribabumandraju@gmail.com",
    phone:'',
    joined: "February 2025",
    following: 1,
    followers: 0,
    posts: 0,
    avatar: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    if (user) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: user?.user?.data?.name || prevProfile.name,
        email: user?.user?.data?.email || prevProfile.email,
        phone: user?.user?.data?.mobile_num || prevProfile.phone,
        joined: user.joined || prevProfile.joined,
        following: user.following || prevProfile.following,
        followers: user.followers || prevProfile.followers,
        posts: user.posts || prevProfile.posts,
        avatar: user.avatar || prevProfile.avatar,
      }));
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState("Home");
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
            <h1 className="text-xl sm:text-xl font-bold">{profile.email}</h1>
            <h1 className="text-sm text-gray-500">Posts {profile.posts}</h1>
          </div>
        </div>

        {/* Cover and Avatar */}
        <div className="relative bg-gray-100 dark:bg-gray-800">
          <img
            src="https://images.meebuddy.com/news-images/thumbnail/d45bc194-cbdf-4044-853d-9e1a8e058441.webp"
            className="h-40 sm:h-56 w-full"
          />
          <img
            src={profile.avatar}
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
        <div className="p-4 sm:p-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold truncate">
                  {profile.email}
                </h1>
                <button className="flex items-center px-3 sm:px-4 py-1 border-2 border-gray-600 text-xs sm:text-sm font-medium text-black bg-white rounded-full">
                  <FaCircleCheck className="text-blue-600 text-lg" />
                  <span>Get Verified</span>
                </button>
              </div>
              <p className="text-gray-500">{profile.phone}</p>
              <p className="mt-2 text-gray-500">📅 Joined {profile.joined}</p>
              <p className="mt-2">
                <span>{profile.following} Following</span> ·{" "}
                <span>{profile.followers} Followers</span>
              </p>
            </div>
            <button className="mt-4 sm:mt-0 flex w-fit items-center px-4 py-1 md:py-2 border-2 border-gray-600 text-sm font-medium text-black bg-white rounded-full">
              <FaEdit />
              <span>Edit Profile</span>
            </button>
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

          {/* Tab Content */}
          <div className="mt-6 h-auto">
            {activeTab === "Home" && <Home/>}
            {activeTab === "Add News" && <AddNewsForm />}
            {activeTab === "Posted News" && <Posted/>}
            {activeTab === "Top 10" && <div>Articles</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
