import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import Layout from "../Layouts/Layout";
const NewsCard2 = ({ title, description, imageUrl, time, location, reactions, comments }) => {
  return (
    <Layout>
    <div className="bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg p-4 w-[93%] md:w-full mx-auto border dark:border-gray-700">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
            alt="KOLD-TV Logo"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">KOLD-TV</h3>
          <p className="text-xs text-gray-500">Website</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{description}</p>

          <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span>📍 {location}</span>
            <span className="ml-2">• {time}</span>
          </div>
        </div>

        {imageUrl && (
          <div className="mt-3 md:mt-0 md:ml-4 md:w-48 md:h-48">
            <img
              src={imageUrl}
              alt="News"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-gray-600 dark:text-gray-300 text-sm">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="reactions">👍❤️</span>
          <span>{reactions}</span>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaRegThumbsUp />
            <span>Like</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaRegComment />
            <span>{comments} Comments</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaShare />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default NewsCard2;
