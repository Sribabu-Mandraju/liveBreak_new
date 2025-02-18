import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import logo from "../../assets/logo.png";

const Dropdown = ({ label, items, isMobile, toggleDropdown, openDropdown, index }) => {
  return (
    <div className="relative cursor-pointer group">
      <div
        className="flex items-center justify-between gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 py-1 lg:py-4 transition-colors duration-300"
        onClick={() => toggleDropdown(index)}
      >
        {label}
        {items && (
          <FaAngleDown
            className={`ml-2 transition-transform duration-300 ${
              isMobile ? (openDropdown === index ? "rotate-180" : "") : "group-hover:rotate-180"
            }`}
          />
        )}
      </div>
      {!isMobile && items && (
        <div className="absolute z-[9999] hidden group-hover:block top-full w-[200px] rounded-md bg-white dark:bg-gray-800 shadow-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {items.map((item, subIndex) => (
            <Link
              key={subIndex}
              to={item.href}
              className="block px-4 py-2 text-gray-700 dark:hover:text-black dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-400 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
      {isMobile && openDropdown === index && items && (
        <div className="pl-4">
          {items.map((item, subIndex) => (
            <Link
              key={subIndex}
              to={item.href}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-100 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showSticky, setShowSticky] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      element.classList.remove("light");
    } else {
      element.classList.remove("dark");
      element.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }

      if (currentScrollY > 100) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "For",
      items: [
        { label: "Men", href: "/men" },
        { label: "Women", href: "/women" },
      ],
    },
    {
      label: "Fashion",
      items: [
        { label: "Clothing", href: "/clothing" },
        { label: "Accessories", href: "/accessories" },
      ],
    },
    {
      label: "Wellness",
      items: [
        { label: "Fitness", href: "/fitness" },
        { label: "Health", href: "/health" },
      ],
    },
    { label: "Chocolates", href: "/chocolates" },
    { label: "Food", href: "/food" },
    { label: "Shark Tank", href: "/shark-tank" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          showSticky
            ? isScrollingUp
              ? "transform translate-y-0"
              : "transform -translate-y-full"
            : ""
        }`}
      >
        <header
          className={`flex justify-center items-center w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            showSticky ? "py-2 shadow-md" : "py-4"
          }`}
        >
          <div className="w-[85%] flex items-center justify-between">
            <div className="h-full flex justify-center items-center">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className={`transition-all duration-300 ${
                  showSticky ? "md:w-32 w-16" : "md:w-40 w-20"
                }`}
              />
            </div>

            <div className="flex flex-row gap-6 lg:gap-10 justify-center items-center">
              <nav className="hidden lg:flex items-center text-md gap-10">
                {navItems.map((item, index) => {
                  if (item.items) {
                    return (
                      <Dropdown
                        key={index}
                        label={item.label}
                        items={item.items}
                        toggleDropdown={toggleDropdown}
                        openDropdown={openDropdown}
                        index={index}
                      />
                    );
                  } else {
                    return (
                      <Link
                        key={index}
                        to={item.href}
                        className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 duration-300 dark:hover:text-blue-400 relative group"
                      >
                        {item.label}
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                      </Link>
                    );
                  }
                })}
              </nav>

              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 dark:text-gray-300 transition-colors duration-300"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <FaTimes size={20} />
                  ) : (
                    <FaBars size={20} />
                  )}
                </button>
              </div>

              <div className="p-3">
                <button
                  className={`text-gray-400 text-xl ${
                    theme === "light" ? "hidden" : ""
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => setTheme("light")}
                  aria-label="Switch to light mode"
                >
                  <MdLightMode />
                </button>
                <button
                  className={`text-gray-600 text-xl ${
                    theme === "dark" ? "hidden" : ""
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => setTheme("dark")}
                  aria-label="Switch to dark mode"
                >
                  <MdDarkMode />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700 dark:text-gray-300 transition-colors duration-300"
            aria-label="Close mobile menu"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="mt-8">
          {navItems.map((item, index) => {
            if (item.items) {
              return (
                <div key={index} className="mb-4">
                  <Dropdown
                    label={item.label}
                    items={item.items}
                    isMobile={true}
                    toggleDropdown={toggleDropdown}
                    openDropdown={openDropdown}
                    index={index}
                  />
                </div>
              );
            } else {
              return (
                <Link
                  key={index}
                  to={item.href}
                  className="block py-2 px-4 mb-4 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }
          })}
        </nav>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar2;