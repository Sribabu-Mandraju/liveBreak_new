import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { FaSpinner } from "react-icons/fa";
import NewsCard from "./NewsCard";
import { fetchPosts } from "../../store/feedSlice";

const PostFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore } = useSelector((state) => state.feed);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Fetch more posts when user scrolls down
  useEffect(() => {
    if (inView && hasMore) {
      dispatch(fetchPosts());
    }
  }, [inView, hasMore, dispatch]);

  return (
    <div className="flex flex-col items-center w-full">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <NewsCard key={post._id || index} data={post} />
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No posts available.</p>
      )}

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={ref} className="py-4 flex justify-center">
          {loading && (
            <FaSpinner className="text-gray-600 dark:text-gray-300 animate-spin text-2xl" />
          )}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
