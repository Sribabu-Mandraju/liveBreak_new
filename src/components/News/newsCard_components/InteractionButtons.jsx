import { useState } from "react"
import { FaRegThumbsUp, FaRegComment, FaShare, FaEye, FaCopy, FaRegThumbsDown } from "react-icons/fa"
import { IoSend } from "react-icons/io5"
import toast from "react-hot-toast"
import Drawer from "../../shadcnui/Drawer"

const InteractionButtons = ({ likes, views, comments }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [commentList, setCommentList] = useState(comments || [])
  const [share, setShare] = useState(false)

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCommentList([...commentList, { text: newComment.trim() }])
      setNewComment("")
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied successfully! ")
  }

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between text-gray-600 dark:text-gray-300 text-sm gap-2">
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center space-x-1 text-blue-500">
          <FaRegThumbsUp className="text-lg" />
          <span className="font-semibold">{likes}</span>
          <FaRegComment className="text-lg text-pink-500" />
          <span className="font-semibold text-pink-500">{comments?.length}</span>
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
            setShowComments(true)
            setShare(false)
          }}
          className="flex items-center space-x-1 cursor-pointer hover:text-green-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaRegComment className="text-base sm:text-lg" />
          <span>{comments.length} Comments</span>
        </button>

        <button
          onClick={() => {
            setShare(true)
            setShowComments(false)
          }}
          className="flex items-center space-x-1 cursor-pointer hover:text-purple-500 transition duration-200 text-xs sm:text-sm"
        >
          <FaShare className="text-base sm:text-lg" /> <span>Share</span>
        </button>
      </div>

      {/* Render Comment Section */}
      <div className="w-full h-full relative">
        {showComments && (
          <Drawer open={showComments} onOpenChange={setShowComments} title="Comments">
            <div className="flex flex-col space-y-4 min-h-[70px]">
              {/* Comment List */}
              <div className="space-y-2 overflow-y-auto max-h-[50vh]">
                {commentList.map((comment, index) => (
                  <div key={index} className="p-2 border-b dark:border-gray-600">
                    {comment.text}
                  </div>
                ))}
              </div>
              {/* Comment Input */}
              <div className="flex flex-row items-center justify-center w-[100%] mb-2">
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
                <a href="#" className="px-4 py-2 bg-green-500 text-white rounded-md text-center">
                  WhatsApp
                </a>
                <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-md text-center">
                  Facebook
                </a>
                <a href="#" className="px-4 py-2 bg-blue-400 text-white rounded-md text-center">
                  Twitter
                </a>
              </div>
            </div>
          </Drawer>
        )}
      </div>
    </div>
  )
}

export default InteractionButtons

