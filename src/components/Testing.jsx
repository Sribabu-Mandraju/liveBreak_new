import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useFeedStore from "../store/useFeedStore"; // Adjust path if needed
import NewsCard2 from "./Shared/NewsCard2";
import { FaSpinner } from "react-icons/fa";

const PostFeed = () => {
  const { posts, fetchPosts, loading, hasMore } = useFeedStore();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  // Always fetch new posts on mount (ensures fresh data)
  useEffect(() => {
    fetchPosts(); // This ensures fresh data on every reload
  }, []); // No dependency means it runs once per mount

  // Fetch more posts when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore) {
      fetchPosts();
    }
  }, [inView, hasMore]);

  return (
    <div className="flex flex-col items-center w-full">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <NewsCard2 key={post._id || index} data={post} />
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
