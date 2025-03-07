import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import Model from "../shadcnui/Model";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

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
import { useNavigate } from "react-router-dom";
import {
  FaAngleDown,
  FaBars,
  FaTimes,
  FaHome,
  FaRss,
  FaNewspaper,
  FaMapMarkerAlt,
  FaUsers,
  FaVideo,
  FaUser,
  FaMobileAlt,
  FaFileAlt,
  FaThLarge,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import Mode from "../shadcnui/Mode";
import { clearToken } from "../../store/authSlice";
const Dropdown = ({ label, items, isMobile, isOpen, toggleDropdown, icon }) => (
  <div className="relative cursor-pointer group">
    <div
      className="flex items-center justify-between  font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 py-2 px-3 rounded-md transition-colors duration-200"
      onClick={toggleDropdown}
    >
      {" "}
      <div className="flex flex-row items-center gap-1 ">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
      {items && (
        <FaAngleDown
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      )}
    </div>
    {items && isOpen && (
      <div
        className={`${
          isMobile ? "mt-2" : "absolute top-full left-0 mt-1"
        } z-50 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg py-1`}
      >
        {items.map((item, subIndex) => (
          <Link
            key={subIndex}
            to={item.href}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
            onClick={isMobile ? toggleDropdown : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [active, setActive] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isSticky,setIsSticky] = useState(false)
  const user = useSelector((state) => state.user);
  console.log(user);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(
      (item) =>
        item.href === currentPath ||
        item.items?.some((subItem) => subItem.href === currentPath)
    );
    if (activeItem) setActive(activeItem.label);
  }, [location]);

  const navItems = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "Feed", href: "/feed", icon: <FaRss /> },
    {
      label: "Mee News",
      icon: <FaNewspaper />,
      items: [
        { label: "Men", href: "/men" },
        { label: "Women", href: "/women" },
      ],
    },
    { label: "Local", href: "/location", icon: <FaMapMarkerAlt /> },
    { label: "Groups", href: "/group", icon: <FaUsers /> },
    { label: "V clips", href: "/vclips", icon: <FaVideo /> },
    { label: "Use App", href: "/useApp", icon: <FaMobileAlt /> },
  ];
  const menuItems = [
    { name: "Select Location", icon: <FaLocationDot />, path: "/location" },
    { name: "Language", icon: <LiaLanguageSolid />, path: "/language" },
    {
      name: "Select Categories",
      icon: <IoDocumentLockOutline />,
      path: "/selectCategories",
    },
    { name: "Posters", icon: <GrGallery />, path: "/posters" },
    { name: "Post A News", icon: <RiFileEditLine />, path: "/postnews" },
    { name: "Ads", icon: <SiGoogleads />, path: "/ads" },
    { name: "Local News", icon: <LuNewspaper />, path: "/localnews" },
    { name: "Categories", icon: <BiSolidCategoryAlt />, path: "/categories" },
    { name: "Refferal", icon: <ImFilesEmpty />, path: "/referral" },
    { name: "Bookmarks", icon: <FaRegBookmark />, path: "/bookmarks" },
    { name: "Magazines", icon: <GiBookPile />, path: "/magazine" },
    { name: "Quizes", icon: <LuFileClock />, path: "/quizes" },
    { name: "Contact Us", icon: <MdOutlineContactSupport />, path: "/contact" },
  ];

  const fetchfields = async (e) => {
    setSearchQuery(e.target.value);

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/common/tags`, {
        key: searchQuery,
        type: "news",
        version: "new",
      });

      console.log(response.data.data);
      setFields(response.data.data || []);
    } catch (error) {
      console.log("Error in fetching :", error);
    }
    setLoading(false);
  };
  const setTag = async (id) => {
    try {
      const response = await axios.post(`${BASE_URL}/common/getTagData`, {
        tag_id: id,
        version: "new",
      });

      console.log(response.data.data);
    } catch (error) {
      console.log("Error in fetching tag details :", error);
    }
  };

  useEffect(() => {
    const handleTheme = () => {
      const element = document.documentElement;
      element.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    };

    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    handleTheme();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/signin");
  };

  return (
    <div
      className={`flex w-screen justify-center z-10 fixed top-[-2px]  md:static  items-center duration-300 `}
    >
      <header
        className={`md:mt-8 w-full md:w-full md:max-w-7xl   md:rounded-full  
        py-1 md:py-1 px-6 md:px-8 bg-white dark:bg-gray-900 md:border  border-b border-gray-400 dark:border-gray-700 relative  `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <Link to="/" className="flex justify-center items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="flex items-center  gap-2">
            <div className="relative  group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                onFocus={() => setIsFocused(true)}
              />
              <IoMdSearch className="text-xl top-[20%]  text-gray-600 group-hover:text-blue-500 dark:text-gray-400 absolute  right-3 duration-200" />
            </div>
            <nav className="hidden lg:flex items-center text-[15px] gap-1">
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.items ? (
                    <Dropdown
                      label={item.label}
                      items={item.items}
                      icon={item.icon}
                      toggleDropdown={() => toggleDropdown(index)}
                      isOpen={openDropdown === index}
                    />
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setActive(item.label)}
                      className={`flex items-center gap-2 font-semibold  ${
                        active === item.label
                          ? "text-blue-700"
                          : "text-gray-700 dark:text-gray-300"
                      } hover:text-blue-700 dark:hover:text-blue-400 py-2 px-3 rounded-md transition-colors duration-200`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MdDarkMode className="text-gray-600 dark:text-gray-400 text-xl" />
              ) : (
                <MdLightMode className="text-gray-400 dark:text-gray-300 text-xl" />
              )}
            </button>
            {user?.user ? (
              <div className="relative group">
                <div className="flex justify-center cursor-pointer text-white rounded-full w-8 h-8 items-center bg-blue-500 dark:bg-gray-700 dark:text-blue-600">
                  {user?.user?.data?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden group-hover:flex absolute pt-2 right-[-40px] z-50 p-4 top-full">
                  <div className="bg-white dark:bg-gray-800 w-[300px] p-5 shadow-xl rounded-xl border border-gray-300 dark:border-gray-700 flex flex-col gap-5">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                      <div className="flex justify-center items-center cursor-pointer text-2xl font-bold text-white min-w-[50px] max-w-[50px] max-h-[50px] min-h-[50px] rounded-full bg-blue-600 dark:bg-gray-700 dark:text-blue-500 shadow-md">
                        <FaUser />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold break-all">
                          {user?.user?.data?.email?.length > 15
                            ? `${user?.user?.data?.email.slice(0, 12)}...`
                            : `${user?.user?.data?.email}`}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-blue-400">
                          {user?.user?.data?.mobile_num}
                        </span>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <button className="w-full py-2 rounded-lg border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white transition-all font-medium">
                      View Profile
                    </button>

                    <hr className="border-gray-300 dark:border-gray-700" />

                    {/* Navigation Links */}
                    <div className="flex flex-col  text-sm">
                      <span className="text-blue-600 font-semibold px-3 py-2">
                        Manage
                      </span>

                      <Link to="/profile">
                        <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 dark:text-white transition-all rounded-lg">
                          <FaUser className="text-blue-500 dark:text-white" />
                          My Profile
                        </div>
                      </Link>

                      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 dark:text-white transition-all rounded-lg">
                        <FaFileAlt className="text-blue-500 dark:text-white" />
                        My Posts
                      </div>

                      <div className="flex items-center gap-3 mb-2 px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 dark:text-white transition-all rounded-lg">
                        <FaThLarge className="text-blue-500 dark:text-white" />
                        My Dashboard
                      </div>
                      <hr />

                      <div className="flex items-center gap-3 px-3 py-2 mt-1 cursor-pointer hover:bg-red-100 dark:hover:bg-red-500 text-red-600 dark:text-red-400 dark:hover:text-white transition-all rounded-lg" onClick={handleLogOut}>
                        <FaSignOutAlt />
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Link
                  to="/signin"
                  className=" px-2 py-[3px] flex justify-center items-center font-semibold bg-blue-500 text-white rounded-lg"
                >
                  {" "}
                  Signin{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
        {isFocused && (
          <div>
            <Model
              isOpen={isFocused}
              onClose={() => setIsFocused(false)}
              title="Search"
            >
              <div className="flex flex-col gap-4 w-[96%] md:w-[600px]">
                <div className="relative my-4">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={fetchfields}
                    className="w-full bg-blue-50 dark:bg-gray-900 px-4 py-2 outline-none border dark:border-gray-700 border-gray-400 rounded-lg"
                  />
                  <IoMdSearch className="text-xl top-[20%]  text-gray-600  dark:text-gray-400 absolute  right-3 duration-200" />
                </div>
                <hr className="dark:text-gray-600" />
                <div className="flex flex-col">
                  <div className="text-xl text-blue-500">Trending</div>

                  <div className="flex flex-wrap gap-4 mt-4 max-h-[30vh] overflow-y-scroll">
                    {fields.map((data) => (
                      <div
                        className="bg-gray-200 dark:bg-gray-900 cursor-pointer px-2 py-1 rounded-xl"
                        onClick={() => {
                          setSelectedTagId(data._id);
                          if (selectedTagId) {
                            setTag(selectedTagId);
                          }
                        }}
                      >
                        {data.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Model>
          </div>
        )}

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleMobileMenu}
            ></div>
            <div
              className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto"
              style={{
                zIndex: "300",
              }}
            >
              <button
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <FaTimes size={24} />
              </button>
              <div className="flex w-full mt-12">
                <Mode />
              </div>
              <div>
                <div className="relative mt-6">
                  <input
                    type="text"
                    placeholder="Search"
                    onFocus={() => setIsFocused(true)}
                    className="w-full bg-blue-50 dark:bg-gray-900 px-4 py-2 outline-none border dark:border-gray-700 border-gray-400 rounded-lg"
                  />
                  <IoMdSearch className="text-xl top-[20%]  text-gray-600  dark:text-gray-400 absolute  right-3 duration-200" />
                </div>
              </div>

              <nav className="flex flex-col justify-start gap-2 mt-6">
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.items ? (
                      <Dropdown
                        label={item.name}
                        items={item.items}
                        icon={item.icon}
                        isMobile={true}
                        toggleDropdown={() => toggleDropdown(index)}
                        isOpen={openDropdown === index}
                      />
                    ) : (
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Navbar;
