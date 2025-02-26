import { useState } from "react";
import { FaRegThumbsUp, FaRegComment, FaShare, FaEye, FaCopy } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoEyeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Drawer from "../shadcnui/Drawer";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
const ReporterInfo = ({ posted_by }) => (
  <div className="flex items-start space-x-4">
    <img
      src={posted_by?.profile_icon || "https://via.placeholder.com/40"}
      alt={posted_by?.name || "Reporter"}
      className="w-10 h-10 rounded-full"
    />
    <div>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {posted_by?.name || "Unknown Reporter"}
      </h3>
      <p className="text-xs text-gray-500">
        {posted_by?.reporter_type || "Reporter"}
      </p>
    </div>
  </div>
);

const MediaContent = ({ news }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (news?.video_urls?.length > 0) {
    return (
      <video controls className="w-full rounded-lg mt-3">
        <source src={news.video_urls[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (news?.image_urls?.length > 0) {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
      customPaging: (i) => (
        <div className="text-sm text-gray-600">{`${i + 1}/${
          news.image_urls.length
        }`}</div>
      ),
      appendDots: (dots) => (
        <div className="mt-2 flex justify-center space-x-2">{dots}</div>
      ),
    };

    return (
      <div className="relative mt-3">
        {/* Slide Indicator at Top Right */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
          {currentSlide + 1}/{news.image_urls.length}
        </div>

        {/* Image Slider */}
        <Slider {...settings} className="rounded-lg">
          {news.image_urls.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`News ${index + 1}`}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return null;
};

const NewsDetails = ({ news }) => (
  <div className="mt-3">
    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
      {news?.title || "No Title"}
    </h2>
    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
      {news?.description || "No Description Available"}
    </p>
  </div>
);

const LocationAndTime = ({ states, district, mandal, createdAt }) => (
  <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
    <div className="flex items-center gap-2">
      <IoLocationOutline className="text-[13px]" />
      <div className="">
        {states[0]?.name}, {district[0]?.name}, {mandal[0]?.name}
      </div>
    </div>

    <span className="ml-2">• {new Date(createdAt).toLocaleString()}</span>
  </div>
);

const InteractionButtons = ({ likes, views, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments || []);

  const [share, setShare] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCommentList([...commentList, newComment.trim()]);
      setNewComment("");
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied successfully! ");
  };

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between text-gray-600 dark:text-gray-300 text-sm gap-2">
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center space-x-1 text-blue-500">
          <FaRegThumbsUp className="text-lg" />
          <span className="font-semibold">{likes}</span>
          <FaRegComment className="text-lg text-pink-500" />
          <span className="font-semibold text-pink-500">
            {comments?.length}
          </span>
        </div>
        <span className="text-xs sm:text-sm">
          <div className="flex gap-1 items-center text-green-600 font-bold">
            <FaEye className="text-[13px]" />
            <div className="">{views}</div>
          </div>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full sm:w-auto justify-between sm:justify-end space-x-3 sm:space-x-4">
        <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-200 text-xs sm:text-sm">
          <FaRegThumbsUp className="text-base sm:text-lg" /> <span>Like</span>
        </button>

        {/* Open Comment Section */}
        <button
          onClick={() => {setShowComments(true);setShare(false)}}
          className="flex items-center space-x-1 cursor-pointer hover:text-green-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaRegComment className="text-base sm:text-lg" />
          <span>{comments.length} Comments</span>
        </button>

        <button
          onClick={() => {setShare(true);setShowComments(false)}}
          className="flex items-center space-x-1 cursor-pointer hover:text-purple-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaShare className="text-base sm:text-lg" /> <span>Share</span>
        </button>
      </div>

      {/* Render Comment Section */}
      
        <div className="w-full h-full relative  ">
        {showComments && (
          <Drawer
            open={showComments}
            onOpenChange={setShowComments}
            title="Comments"
          >
            <div className="flex flex-col space-y-4 min-h-[70px]">
             

              {/* Comment List */}
              <div className="space-y-2 overflow-y-auto max-h-[50vh]">
                {commentList.map((comment, index) => (
                  <div
                    key={index}
                    className="p-2 border-b dark:border-gray-600"
                  >
                    {comment}
                  </div>
                ))}
              </div>
               {/* Comment Input */}
               <div className="flex flex-row items-center  justify-center  w-[100%]   mb-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 m-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 text-xl absolute right-8 text-blue-600 rounded-[40%]"
                >
                  <IoSend />
                </button>
              </div>
            </div>
          </Drawer>
          )}
           {share && (
            <Drawer open={share} onOpenChange={setShare} title="Share">
            <div className="flex flex-col items-center space-y-4 my-4 md:my-8 ">
                <div className="flex flex-col w-[85%] md:w-[50%]">
                  <div>Share via link</div>
                  <div className="flex relative items-center mt-2 space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={window.location.href}
                      className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 text-blue-600 absolute right-2 md:right-4 rounded-md"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
  
                {/* Social Media Buttons */}
                <div className="flex flex-wrap gap-4 ">
                  <a href='#' className="px-4 py-2 bg-green-500 text-white rounded-md text-center">WhatsApp</a>
                  <a href='#' className="px-4 py-2 bg-blue-600 text-white rounded-md text-center">Facebook</a>
                  <a href='#' className="px-4 py-2 bg-blue-400 text-white rounded-md text-center">Twitter</a>
                </div>
              </div>
            </Drawer>
             )}
        </div>
      

      
        
     
    </div>
  );
};

const NewsCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg p-4 w-[93%] md:w-full mx-auto border dark:border-gray-700">
      <ReporterInfo posted_by={data.posted_by} />
      <NewsDetails news={data.news} />
      <MediaContent news={data.news} />
      <LocationAndTime
        states={data.states}
        district={data.district}
        mandal={data.mandal}
        createdAt={data.createdAt}
      />
      <InteractionButtons
        likes={data.likes}
        views={data.views}
        comments={data.comments}
      />
    </div>
  );
};

export default NewsCard;
