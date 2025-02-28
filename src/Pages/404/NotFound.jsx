import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 text-gray-900 dark:text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* Logo with hover effect */}
        <motion.img
          src={logo}
          className="w-full max-w-sm hover:scale-105 transition-transform duration-300 cursor-pointer filter dark:brightness-110"
          alt="Logo"
          whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
        />

        {/* 404 Message with animated appearance */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mt-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          This page doesn't exist.
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 text-center dark:text-gray-400 mt-4 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Try searching for something else or return to the home page.
        </motion.p>

        {/* Home Button with hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/"
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Return Home</span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;


// new line
