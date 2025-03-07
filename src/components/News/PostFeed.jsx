import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import NewsCard from "./NewsCard";
import { fetchPosts, clearFeed } from "../../store/feedSlice";

const SkeletonLoader = () => (
  <div className="bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg p-4 w-[93%] md:w-full mx-auto border dark:border-gray-700 animate-pulse">
    {/* Reporter Info Skeleton */}
    <div className="flex items-start space-x-4">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
      </div>
    </div>

    {/* News Details Skeleton */}
    <div className="mt-3">
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mt-2" />
      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
    </div>

    {/* Media Content Skeleton */}
    <div className="mt-3 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />

    {/* Location and Time Skeleton */}
    <div className="mt-3 flex items-center">
      <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded ml-2" />
    </div>

    {/* Interaction Buttons Skeleton */}
    <div className="mt-3 flex justify-between">
      <div className="flex space-x-4">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

const PostFeed = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore } = useSelector((state) => state.feed);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  // Ensure fresh data on mount
  useEffect(() => {
    dispatch(clearFeed()); // Clear previous posts
    dispatch(fetchPosts({})); // Fetch fresh posts with default payload
  }, [dispatch]);

  // Fetch more posts when user scrolls down
  useEffect(() => {
    if (inView && hasMore) {
      dispatch(fetchPosts({}));
    }
  }, [inView, hasMore, dispatch]);

  return (
    <div className="flex flex-col items-center w-full">
      {posts.length > 0 &&
        posts.map((post, index) => (
          <NewsCard key={post._id || index} data={post} />
        ))}

      {!loading && posts.length > 0 && (
        <p className="text-gray-600 dark:text-gray-300">No posts available.</p>
      )}

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={ref} className="w-full">
          {loading && (
            <div className="flex flex-col gap-4 w-full">
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
