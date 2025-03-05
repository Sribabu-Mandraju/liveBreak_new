import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import NewsCard from "../News/NewsCard";
import {
  fetchLocalNews,
  clearLocalNews,
  setLocationInfo,
} from "../../store/localNewsSlice";
import LocalNewsCard from "./LocalNewsCard";

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

const LocalNewsFeed = ({ locationData }) => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore, locationInfo } = useSelector(
    (state) => state.localNews
  );
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
  const prevLocationRef = useRef();

  // Set location info and fetch fresh data only when location changes
  useEffect(() => {
    if (locationData) {
      const locationChanged =
        JSON.stringify(prevLocationRef.current) !==
        JSON.stringify(locationData);

      if (locationChanged) {
        dispatch(clearLocalNews()); // Clear only when location changes
        dispatch(setLocationInfo(locationData));
        dispatch(fetchLocalNews(locationData));
        prevLocationRef.current = locationData;
      }
    }
  }, [dispatch, locationData]);

  // Fetch more posts when user scrolls down
  useEffect(() => {
    if (inView && hasMore && !loading) {
      dispatch(
        fetchLocalNews({
          ...locationInfo,
          // last_id is handled automatically by the slice
        })
      );
    }
  }, [inView, hasMore, dispatch, locationInfo, loading]);

  if (!locationData) {
    return (
      <div className="text-gray-600 dark:text-gray-300">
        Please select a location to view news.
      </div>
    );
  }

  if (loading && posts.length === 0) {
    return (
      <>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* News Posts */}
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <LocalNewsCard key={post._id || index} data={post} />
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          No local news available for this location.
        </p>
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

export default LocalNewsFeed;
