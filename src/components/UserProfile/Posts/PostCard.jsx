import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import NewsCard from "../../News/NewsCard";
// import { fetchPosts, clearFeed } from "../../store/feedSlice";
import axios from "axios";

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

const PostFeed = ({data}) => {

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState({});
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!data) return;
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/common/feed `, {
          post_id: "",
          last_id: "",
          type: "",
          bookmarks: false,
          tag_id: "",
          posted_by: data,
          isReporter: true,
          version: "new",
        });
        setUserPosts(response.data?.data || {});
      } catch (error) {
        console.error("Error in fetching user posts:", error);
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [data, BASE_URL]);

  return (
    <div className="flex flex-col items-center w-full">
      {userPosts.length > 0 ? (
        userPosts.map((post, index) => (
          <NewsCard key={post._id || index} data={post} />
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No posts available.</p>
      )}

      {/* Infinite Scroll Trigger */}
      {loading && (
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
