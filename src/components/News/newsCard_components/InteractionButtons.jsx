import { useState } from "react";
import {
  FaRegThumbsUp,
  FaRegComment,
  FaShare,
  FaEye,
  FaCopy,
  FaUserCircle,
  FaRegThumbsDown,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import Drawer from "../../shadcnui/Drawer";

const InteractionButtons = ({ likes, views, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments || []);
  const [share, setShare] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCommentList([...commentList, { text: newComment.trim() }]);
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
        <div className="flex items-center gap-2">
          <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-200 text-xs sm:text-sm">
            <FaRegThumbsUp className="text-base sm:text-lg" />{" "}
          </button>
          <button className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-200 text-xs sm:text-sm">
            <FaRegThumbsDown className="text-base sm:text-lg" />{" "}
          </button>
        </div>

        {/* Open Comment Section */}
        <button
          onClick={() => {
            setShowComments(true);
            setShare(false);
          }}
          className="flex items-center space-x-1 cursor-pointer hover:text-green-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaRegComment className="text-base sm:text-lg" />
          <span>{comments.length} Comments</span>
        </button>

        <button
          onClick={() => {
            setShare(true);
            setShowComments(false);
          }}
          className="flex items-center space-x-1 cursor-pointer hover:text-purple-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaShare className="text-base sm:text-lg" /> <span>Share</span>
        </button>
      </div>

      {/* Render Comment Section */}
      <div className="w-full h-full relative">
        {showComments && (
          <Drawer
            open={showComments}
            onOpenChange={setShowComments}
            title="Comments"
          >
            <div className="flex flex-col min-h-[70px] p-4">
              {/* Comment List */}
              <div className="space-y-4 overflow-y-auto max-h-[50vh] p-2">
                {commentList.length > 0 ? (
                  commentList.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex space-x-3 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-md"
                    >
                      {/* Profile Icon */}
                      <FaUserCircle className="text-3xl text-gray-500 dark:text-gray-400" />

                      {/* Comment Content */}
                      <div className="flex flex-col w-full">
                        {/* User & Time */}
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-semibold dark:text-gray-300">
                            {comment.commented_by.name}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            • Just now
                          </span>
                        </div>

                        {/* Comment Text */}
                        <p className="text-gray-800 dark:text-gray-300">
                          {comment.text}
                        </p>

                        {/* Replies */}
                        {comment.sub_comments.length > 0 && (
                          <div className="mt-2 ml-8 space-y-2">
                            {comment.sub_comments.map((reply) => (
                              <div
                                key={reply._id}
                                className="flex space-x-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                              >
                                <FaUserCircle className="text-2xl text-gray-400 dark:text-gray-500" />
                                <div>
                                  <p className="text-sm font-semibold dark:text-gray-300">
                                    {reply.commented_by.name}
                                  </p>
                                  <p className="text-sm text-gray-700 dark:text-gray-400">
                                    {reply.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>

              {/* Comment Input */}
              <div className="flex items-center mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 bg-transparent focus:outline-none dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  onClick={handleAddComment}
                  className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
                >
                  <IoSend className="text-xl" />
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
                <a
                  href="#"
                  className="px-4 py-2 bg-green-500 text-white rounded-md text-center"
                >
                  WhatsApp
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-center"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-blue-400 text-white rounded-md text-center"
                >
                  Twitter
                </a>
              </div>
            </div>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default InteractionButtons;
