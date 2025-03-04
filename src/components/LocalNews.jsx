import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocalNews,
  setLocationInfo,
  clearLocalNews,
} from "../store/localNewsSlice";

const LocalNews = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore, locationInfo } = useSelector(
    (state) => state.localNews
  );

  // Example location data
  const locationData = {
    village: "5ffde93a528beb352afbbe68",
    mandal: "5ffde92b6563fd34c467ee75",
    district: "62651756308ead190bc95820",
    state: "5ffde92916ae1e34a0a6965b",
    location_name: "Eluru",
    location_type: "district",
  };

  useEffect(() => {
    // Set location info when component mounts
    dispatch(setLocationInfo(locationData));

    // Clear previous news and fetch new ones
    dispatch(clearLocalNews());
    dispatch(fetchLocalNews(locationData));
  }, []); // Empty dependency array for initial load

  // Function to handle loading more news
  const loadMore = () => {
    dispatch(
      fetchLocalNews({
        ...locationInfo,
        // last_id will be automatically handled by the slice
      })
    );
  };

  // Function to change location
  const changeLocation = (newLocationData) => {
    dispatch(clearLocalNews()); // Clear existing news
    dispatch(setLocationInfo(newLocationData)); // Set new location info
    dispatch(fetchLocalNews(newLocationData)); // Fetch news for new location
  };

  if (loading && posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="local-news-container">
      <h2>Local News - {locationInfo.location_name}</h2>

      {/* Example of location selector */}
      <div className="location-selector">
        <button
          onClick={() =>
            changeLocation({
              ...locationData,
              location_name: "Different City",
              district: "different_district_id",
            })
          }
        >
          Change Location
        </button>
      </div>

      {/* News list */}
      <div className="news-list">
        {posts.map((post) => (
          <div key={post._id} className="news-item">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {/* Add more post details as needed */}
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasMore && !loading && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}

      {loading && <div>Loading more...</div>}
    </div>
  );
};

export default LocalNews;
