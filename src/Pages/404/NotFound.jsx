import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import logo from '../../assets/logo.png';
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-6">
      {/* Twitter Logo */}
      <img src={logo} className="w-full max-w-sm" alt="" />

      {/* 404 Message */}
      <h1 className="text-3xl font-bold text-center">This page doesn’t exist.</h1>
      <p className="text-gray-600 text-center dark:text-gray-400 mt-2">
        Try searching for something else.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#1DA1F2] text-white font-semibold rounded-full hover:bg-[#0d8adb] transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
