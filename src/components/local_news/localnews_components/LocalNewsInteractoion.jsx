import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLocalNewsDislike,
  updateLocalNewsLike,
} from "../../../store/localNewsSlice";
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
import { IoShareSocialOutline } from "react-icons/io5";

const LocalNewsInteraction = ({
  likes = 0,
  dislikes = 0,
  views = 0,
  comments = [],
  post_id,
  liked_users = [],
  disliked_users = [],
}) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [share, setShare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [results, setResults] = useState(comments || []);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);

  const isLiked = userId && liked_users.includes(userId);
  const isDisliked = userId && disliked_users.includes(userId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setResults([...results, { text: newComment.trim() }]);
      setNewComment("");
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/post/${post_id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied successfully!");
  };

  const fetchComments = async () => {
    setShowComments(true);
    setShare(false);
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/news/comments`,
        {
          post_id: post_id,
          version: "new",
        },
        {
          headers: {
            "X-News-Token": token,
          },
        }
      );

      console.log(response.data.data);
      setResults(response.data.data || []);
    } catch (error) {
      console.log("Error in fetching comments:", error);
    }
    setLoading(false);
  };

  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like posts");
      return;
    }

    try {
      setLikeLoading(true);
      const result = await dispatch(updateLocalNewsLike({ post_id })).unwrap();
      if (result.likes !== undefined) {
        toast.success(isLiked ? "Like removed" : "Post liked successfully!");
      }
    } catch (error) {
      console.error("Like error:", error);
      toast.error(error || "Failed to update like");
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!token) {
      toast.error("Please login to dislike posts");
      return;
    }

    try {
      setLikeLoading(true);
      const result = await dispatch(
        updateLocalNewsDislike({ post_id })
      ).unwrap();
      if (result.dislikes !== undefined) {
        toast.success(
          isDisliked ? "Dislike removed" : "Post disliked successfully!"
        );
      }
    } catch (error) {
      console.error("Dislike error:", error);
      toast.error(error || "Failed to update dislike");
    } finally {
      setLikeLoading(false);
    }
  };

  console.log(comments);

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between text-gray-600 dark:text-gray-300 text-sm gap-2">
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
        {/* <div className="flex items-center space-x-1 text-blue-500">
          <FaRegThumbsUp
            className={`text-lg ${likeLoading ? "opacity-50" : ""} ${
              isLiked ? "text-blue-600" : ""
            }`}
          />
          <span className="font-semibold">{likes}</span>
          <FaRegComment className="text-lg text-pink-500" />
          <span className="font-semibold text-pink-500">
            {comments?.length || 0}
          </span>
        </div> */}
        <span className="text-xs sm:text-sm">
          <div className="flex gap-1 items-center text-green-600 font-bold">
            <FaEye className="text-[13px]" />
            <div className="">{views || 0}</div>
          </div>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full sm:w-auto justify-between sm:justify-end space-x-3 sm:space-x-4">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-200 text-xs sm:text-sm"
            onClick={handleLike}
          >
            <FaRegThumbsUp className="text-base text-blue-600 sm:text-lg" />
          </button>
          <div className="text-blue-600">{likes}</div>

          <button
            onClick={handleDislike}
            className="flex text-red-600 items-center space-x-1 cursor-pointer hover:text-red-500 transition duration-200 text-xs sm:text-sm"
          >
            <FaRegThumbsDown
              className={`text-base sm:text-lg ${
                isDisliked ? "text-red-600" : ""
              }`}
            />
            <span>{dislikes}</span>
          </button>
        </div>

        {/* Open Comment Section */}
        <button
          onClick={fetchComments}
          className="flex items-center space-x-1 cursor-pointer text-green-600 font-bold hover:text-green-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaRegComment className="text-base sm:text-lg" />
          <span>{results?.length} Comments</span>
        </button>

        <button
          onClick={() => {
            setShare(true);
            setShowComments(false);
          }}
          className="flex items-center space-x-1 cursor-pointer hover:text-purple-500 text-purple-500  transition duration-200 text-xs sm:text-sm"
        >
          <IoShareSocialOutline className="text-base sm:text-lg" />{" "}
          <span>Share</span>
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
                {results?.length > 0 ? (
                  results.map((comment) => (
                    <div
                      key={comment?._id || Math.random()}
                      className="flex space-x-3 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-md"
                    >
                      {/* Profile Icon */}
                      <FaUserCircle className="text-3xl text-gray-500 dark:text-gray-400" />

                      {/* Comment Content */}
                      <div className="flex flex-col w-full">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-semibold dark:text-gray-300">
                            {comment?.commented_by?.name || "Anonymous"}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            • Just now
                          </span>
                        </div>

                        <p className="text-gray-800 dark:text-gray-300">
                          {comment?.text || "No content"}
                        </p>

                        {/* Replies */}
                        {comment?.sub_comments?.length > 0 && (
                          <div className="mt-2 ml-8 space-y-2">
                            {comment.sub_comments.map((reply) => (
                              <div
                                key={reply?._id || Math.random()}
                                className="flex space-x-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                              >
                                <FaUserCircle className="text-2xl text-gray-400 dark:text-gray-500" />
                                <div>
                                  <p className="text-sm font-semibold dark:text-gray-300">
                                    {reply?.commented_by?.name || "Anonymous"}
                                  </p>
                                  <p className="text-sm text-gray-700 dark:text-gray-400">
                                    {reply?.text || "No content"}
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
              {/* dd */}
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

export default LocalNewsInteraction;
