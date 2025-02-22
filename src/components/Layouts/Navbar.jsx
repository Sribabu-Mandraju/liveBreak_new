import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import logo from "../../assets/logo.png";

const Dropdown = ({
  label,
  items,
  isMobile,
  toggleDropdown,
  openDropdown,
  index,
}) => {
  return (
    <div className="relative cursor-pointer group">
      <div
        className="flex items-center justify-between gap-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 py-1 lg:py-4"
        onClick={() => toggleDropdown(index)}
      >
        {label}
        {items && (
          <FaAngleDown
            className={`ml-2 transition-transform duration-300 ${
              isMobile
                ? openDropdown === index
                  ? "rotate-180"
                  : ""
                : "group-hover:rotate-180"
            }`}
          />
        )}
      </div>
      {!isMobile && items && (
        <div className="absolute z-[9999] hidden group-hover:block top-full w-[200px] rounded-md bg-white dark:bg-gray-800 shadow-md p-2">
          {items.map((item, subIndex) => (
            <Link
              key={subIndex}
              to={item.href}
              className="block px-4 py-2 text-gray-700 dark:hover:text-black dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-400"
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
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div
      className={`flex w-screen justify-center sticky top-0 md:static  items-center duration-300 `}
    >
      <header
        className={`md:mt-8 w-full md:w-full md:max-w-7xl  md:rounded-full  
        py-1 md:py-0 px-6 md:px-8 bg-white dark:bg-gray-900  border border-black dark:border-gray-700 relative  `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 me-3 dark:text-gray-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={15} />
                ) : (
                  <FaBars size={15} />
                )}
              </button>
            </div>
            <div className="h-full flex justify-center items-center">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className="md:w-40 w-20"
              />
            </div>
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
                      className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-700 duration-300 dark:hover:text-blue-400"
                    >
                      {item.label}
                      <span
                        className={`absolute left-0 bottom-0 w-full h-1 bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100`}
                      ></span>
                    </Link>
                  );
                }
              })}
            </nav>

            <div className="p-3">
              <button>
                <MdLightMode
                  className={`text-gray-400 text-xl ${
                    theme === "light" ? "hidden" : ""
                  } cursor-pointer transition-all duration-300 `}
                  onClick={() => setTheme("light")}
                />
              </button>
              <button>
                <MdDarkMode
                  className={`text-gray-600 text-xl ${
                    theme === "dark" ? "hidden" : ""
                  } cursor-pointer transition-all duration-300`}
                  onClick={() => setTheme("dark")}
                />
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-[9990]  bg-black/50 lg:hidden"
            onClick={toggleDropdown}
          ></div> // Overlay for smooth UX
        )}

        <div
          className={`fixed left-0 top-0 h-full z-[9999] w-64 bg-white dark:bg-gray-800 shadow-lg p-4 transform transition-transform duration-300 ease-in-out  lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ✖
          </button>

          <nav className="flex flex-col justify-start gap-4 mt-8">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.items ? (
                  <>
                    <Dropdown
                      label={item.label}
                      items={item.items}
                      isMobile={true}
                      toggleDropdown={toggleDropdown}
                      openDropdown={openDropdown}
                      index={index}
                    />
                    <hr className="border-gray-200 dark:border-gray-700" />
                  </>
                ) : (
                  <>
                    <Link
                      to={item.href}
                      className="block py-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700" />
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
