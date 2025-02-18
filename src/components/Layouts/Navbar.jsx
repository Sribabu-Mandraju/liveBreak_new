
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaAngleDown, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa"
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import logo from "../../assets/logo.png"

const Dropdown = ({ label, items, isMobile, toggleDropdown, openDropdown, index }) => {
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
              isMobile ? (openDropdown === index ? "rotate-180" : "") : "group-hover:rotate-180"
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
  )
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)


  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

useEffect(() => {
  const element = document.documentElement
  if (theme === 'dark') {
    element.classList.add('dark');
    element.classList.remove('light')
  } else {
    element.classList.remove('dark');
    element.classList.add('light')
  }
  localStorage.setItem('theme', theme)
}, [theme])

const [showSticky, setShowSticky] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setShowSticky(true);
    } else {
      setShowSticky(false);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
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
  ]

  return (
    <div className={`flex w-screen justify-center  items-center duration-300 ${showSticky ? 'sticky top-0  z-50 shadow-lg ' : ''}`}>
    <header className={`  ${showSticky? "mt-0 w-full ":"md:mt-8 mt-4  w-full md:max-w-7xl  rounded-full"}  py-1 md:py-0 px-6 md:px-8 bg-white dark:bg-gray-900  border border-black dark:border-gray-700 relative  `}>
      <div className="flex items-center justify-between">
        <div className="h-full flex justify-center items-center">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="md:w-40 w-20" />
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
                )
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
                )
              }
            })}
          </nav>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
            </button>
          </div>

          <div className="p-3">
        <button><MdLightMode  className={`text-gray-400 text-xl ${theme==='light'?'hidden':""} cursor-pointer transition-all duration-300 `} onClick={()=>setTheme('light')}/></button>
        <button><MdDarkMode  className={`text-gray-600 text-xl ${theme==='dark'?'hidden':""} cursor-pointer transition-all duration-300`} onClick={()=>setTheme('dark')}/></button>

    </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute z-10 top-full left-0 w-full rounded-lg bg-white dark:bg-gray-800 p-4 lg:hidden mt-2">
          <nav className="flex flex-col justify-start gap-2">
            {navItems.map((item, index) => {
              if (item.items) {
                return (
                  <div key={index}>
                    <Dropdown
                      label={item.label}
                      items={item.items}
                      isMobile={true}
                      toggleDropdown={toggleDropdown}
                      openDropdown={openDropdown}
                      index={index}
                    />
                    <hr className="border-gray-200 dark:border-gray-700" />
                  </div>
                )
              } else {
                return (
                  <div key={index}>
                    <Link
                      to={item.href}
                      className="block py-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700" />
                  </div>
                )
              }
            })}
          </nav>
        </div>
      )}
    </header>
    </div>
  )
}

export default Navbar