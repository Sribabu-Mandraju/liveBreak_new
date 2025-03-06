import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomMenu from "../Home/BottomMenu";
import Navbar from "./Navbar";
import axios from "axios";
import Trending from "../Home/Trending";
import { FaLocationDot } from "react-icons/fa6";
import Model from "../shadcnui/Model";
import { LiaLanguageSolid } from "react-icons/lia";
import { IoDocumentLockOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { RiFileEditLine } from "react-icons/ri";
import { SiGoogleads } from "react-icons/si";
import { LuNewspaper } from "react-icons/lu";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { ImFilesEmpty } from "react-icons/im";
import { FaRegBookmark } from "react-icons/fa6";
import { GiBookPile } from "react-icons/gi";
import { LuFileClock } from "react-icons/lu";
import { MdOutlineContactSupport } from "react-icons/md";

import { BsFillPenFill } from "react-icons/bs";
import { useTheme } from "../../providers/ThemeProvider";

const menuItems = [
  { name: "Select Location", icon: <FaLocationDot />, path: "newscard" },
  { name: "Language", icon: <LiaLanguageSolid />, action: "openLanguageModal" },
  {
    name: "Select Categories",
    icon: <IoDocumentLockOutline />,
    path: "categories",
  },
  { name: "Posters", icon: <GrGallery />, path: "posters" },
  { name: "Post A News", icon: <RiFileEditLine />, path: "postnews" },
  { name: "Ads", icon: <SiGoogleads />, path: "ads" },
  { name: "Local News", icon: <LuNewspaper />, path: "localnews" },
  { name: "Categories", icon: <BiSolidCategoryAlt />, path: "Catcategories" },
  { name: "Refferal", icon: <ImFilesEmpty />, path: "referral" },
  { name: "Bookmarks", icon: <FaRegBookmark />, path: "bookmark" },
  { name: "Magazines", icon: <GiBookPile />, path: "magazine" },
  { name: "Quizes", icon: <LuFileClock />, path: "quizes" },
  { name: "Contact Us", icon: <MdOutlineContactSupport />, path: "contact" },
];

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumb ">
      <ul className="flex items-center text-sm text-gray-500 space-x-2">
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {isLast ? (
                <span className="text-lg font-semibold text-blue-600 capitalize">
                  {segment}
                </span>
              ) : (
                <Link
                  to={path}
                  className="hover:text-blue-600 text-lg font-semibold capitalize"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);
  const user = useSelector((state) => state.user);
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [lang, setLang] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);


  const handleMenuClick = (item) => {
    console.log("what happen")
    if (item.action === "openLanguageModal") {
      setLanguageModalOpen(true);
      fetchLang();
    } else if (item.path) {
      navigate(`/${item.path}`);
    }
  };


  const fetchLang = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/common/languagelist`);
      setLang(response.data?.data || null);
    } catch (error) {
      console.error("Error in fetching languages:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen flex-col justify-center items-center flex gap-4">
      <div>
        <BottomMenu />
      </div>
      <div className="flex  justify-center w-screen lg:px-20 flex-row gap-4">
        {/* Sidebar - Left (Sticky) */}
        <div className="hidden md:block  w-1/4 h-[calc(100vh-30px)] sticky top-[10px]">
          <div className="border border-zinc-700 rounded-md h-full overflow-hidden">
            <div>
              {/* Desktop Side Menu */}
              <div className="hidden  md:flex h-[calc(100vh-70px)] w-64  px-4 py-6 flex-col overflow-y-scroll  transition-all duration-300">
                <div className="">
                  <ul>
                    {menuItems.map((item, index) => (
                      <li key={index} className="mb-1 ">
                        <button
                          onClick={() => handleMenuClick(item)}
                          className={`flex items-center gap-4 p-2 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all
                                ${
                                  isActive(item.path)
                                    ? "bg-blue-100 dark:bg-blue-500 dark:text-white text-blue-600"
                                    : ""
                                }
                                `}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-base font-medium">
                            {item.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 w-full bg-blue-500  hover:bg-blue-600 text-white font-bold py-1 rounded-full flex items-center justify-center gap-4">
                    <BsFillPenFill />
                    Post
                  </button>
                </div>
                { user && (

                <div className="flex flex-row items-center mt-6  gap-12 justify-between w-full">
                  <div className="flex items-center gap-4 ">
                    <img
                      src="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
                      alt="User"
                      className="rounded-full w-10 h-10"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user?.user?.data?.email}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user?.user?.data?.mobile_num}
                      </p>
                    </div>
                  </div>
                  <div>
                  <button
                    onClick={toggleTheme}
                    className="p-1 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                  >
                    {theme === "light" ? "🌙" : "☀️"}
                  </button>
                  </div>
                </div>
                )}
              </div>

              {/* Mobile Bottom Menu */}
              <div
                className="fixed bottom-0 left-0  right-0  bg-white dark:bg-gray-900 flex justify-around items-center p-3 md:hidden shadow-md"
                style={{
                  zIndex: "20",
                }}
              >
                {menuItems.slice(0, 5).map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  >
                    <span className="text-2xl">{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* children */}
        <div className="w-full md:w-2/4 flex flex-col p-2 mt-2 mb-10 sticky top-[10px]">
          {/* <Breadcrumb /> */}
          {children}
        </div>
        <div className="hidden md:block w-1/4 h-[calc(100vh-30px)] sticky top-[10px]">
          <div className="border border-zinc-700 rounded-md h-full overflow-hidden">
            <Trending />
          </div>
        </div>
      </div>

      {isLanguageModalOpen && (
        <Model
          isOpen={isLanguageModalOpen}
          onClose={() => setLanguageModalOpen(false)}
          title="Select Language"
        >
          <div className="flex flex-wrap gap-6 mt-8 w-[700px] ">
            {
              lang && (
                lang.map((data,index)=>(
                  <div className="flex justify-center items-center cursor-pointer duration-300 dark:hover:bg-gray-700 hover:bg-gray-200 md:px-12 px-4 py-1 border rounded-lg focus:border-blue-500">
                    <div className="flex gap-2  flex-row">
                      <div>
                        <img src={data.icon} alt="lang_icon" className="w-[30px] " />
                      </div>
                      <div>
                        {data.name}
                      </div>

                    </div>

                  </div>
                ))
              )
            }

          </div>
        </Model>
      )}
    </div>
  );
};

export default Layout;
