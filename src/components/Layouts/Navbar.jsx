import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  FaMobileAlt,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

const Dropdown = ({ label, items, isMobile, isOpen, toggleDropdown, icon }) => (
  <div className="relative cursor-pointer group">
    <div
      className="flex items-center justify-between gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 py-2 px-3 rounded-md transition-colors duration-200"
      onClick={toggleDropdown}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
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
    { label: "V clips", href: "/vClips", icon: <FaVideo /> },
    { label: "Use App", href: "/useApp", icon: <FaMobileAlt /> },
  ];

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

  return (
    <div
      className={`flex w-screen justify-center z-10 fixed top-[-2px]  md:static  items-center duration-300 `}
    >
      <header
        className={`md:mt-8 w-full md:w-full md:max-w-7xl   md:rounded-full  
        py-1 md:py-0 px-6 md:px-8 bg-white dark:bg-gray-900 md:border  border-b border-gray-400 dark:border-gray-700 relative  `}
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

          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center text-md gap-2">
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
                  {user?.user?.data?.email.charAt(0).toUpperCase()}
                </div>
                <div className="hidden group-hover:flex absolute  pt-2 right-[-30px] z-50 p-4    top-full">
                  <div className=" bg-white dark:bg-gray-800 dark:border-gray-700 w-[280px] p-2 shadow-md rounded-lg border border-gray-300  flex-col gap-4">
                    <div className="flex flex-col  w-full gap-6 items-center mt-6">
                      <div className="flex flex-row gap-4 items-center">
                      <div className="flex justify-center cursor-pointer text-2xl  text-white rounded-full w-12 h-12 items-center bg-blue-500 dark:bg-gray-700 dark:text-blue-600">
                        {user?.user?.data?.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col text-sm ">
                        <div className="font-semibold text-lg">
                          {user?.user?.data?.email}
                        </div>
                        <div className="text-blue-500">
                          {user?.user?.data?.mobile_num}
                        </div>

                      </div>

                      </div>
                      <div className="w-[80%]"> 
                        <button className="w-full py-1 rounded-lg border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white">View Profile</button>
                      </div>
                      
                    </div>
                    <hr className=" text-gray-300 my-4"/>
                    <div className="flex flex-col gap-2 pb-4 px-4">
                    <div className="text-blue-600 rounded-lg px-2 py-1 cursor-pointer">
                      Manage
                    </div>
                    <Link to="/profile">
                      <div className="hover:bg-blue-100 dark:hover:bg-blue-500 rounded-lg px-2 py-1 cursor-pointer">
                        My Profile
                      </div>
                    </Link>
                    <div className="hover:bg-blue-100 dark:hover:bg-blue-500 rounded-lg px-2 py-1 cursor-pointer">
                      My Posts
                    </div>
                    <div className="hover:bg-blue-100 dark:hover:bg-blue-500 rounded-lg px-2 py-1 cursor-pointer">
                      My Dashboard
                    </div>
                    <div className="hover:bg-blue-100 dark:hover:bg-blue-500 rounded-lg px-2 py-1 cursor-pointer">
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
              <nav className="flex flex-col justify-start gap-2 mt-12">
                {navItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.items ? (
                      <Dropdown
                        label={item.label}
                        items={item.items}
                        icon={item.icon}
                        isMobile={true}
                        toggleDropdown={() => toggleDropdown(index)}
                        isOpen={openDropdown === index}
                      />
                    ) : (
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 py-2 px-3 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        {item.label}
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
