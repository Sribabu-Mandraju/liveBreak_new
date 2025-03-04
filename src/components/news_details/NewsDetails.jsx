import { useState } from "react";
import {
  Moon,
  Sun,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";

function NewsDetails() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(43);
  const [comments, setComments] = useState(12);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition-all duration-300">
        <div className="w-full max-w-sm md:max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">
              Mee News
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon />}
            </button>
          </div>

          {/* Image */}
          <img
            src="https://via.placeholder.com/600x300"
            alt="News"
            className="w-full h-60 object-cover"
          />

          {/* Content */}
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              చేతనే పాడువు పద్ధతిని వెంటనే ప్రామాణికంగా చేయాలి
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              క్షేత్ర స్థాయి పరిశీలన మరిచిన అధికారులు చేతనే కార్మికులను అవమానం
              చేయకూడదు, అర్థవంతమైన చర్యలు తీసుకోవాలి. అధికారుల పరిపాలనలో స్పష్టత
              ఉండాలి.
            </p>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 font-semibold mt-2 inline-block"
            >
              Read More...
            </a>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  isLiked
                    ? "text-red-500 dark:text-red-400"
                    : "hover:text-red-500 dark:hover:text-red-400"
                }`}
              >
                <ThumbsUp size={18} className={isLiked ? "fill-current" : ""} />
                <span>{likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-green-500 dark:hover:text-green-400">
                <MessageCircle size={18} />
                <span>{comments}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-400">
                <Share2 size={18} />
              </button>
            </div>
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1 transition-colors duration-200 ${
                isBookmarked
                  ? "text-purple-500 dark:text-purple-400"
                  : "hover:text-purple-500 dark:hover:text-purple-400"
              }`}
            >
              <Bookmark
                size={18}
                className={isBookmarked ? "fill-current" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetails;
