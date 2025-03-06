import React from "react";
import LocalNewsFeed from "./LocalNewsFeed";
import { useSelector } from "react-redux";
import LocationSelector from "../../auth/LocationSelector";
const LocalNewsContainer = () => {
  const selectedLocation = useSelector(
    (state) => state.location?.selectedLocation
  );
  const locationData = selectedLocation?.data;
  const status = selectedLocation?.status;

  // Format location data for the news feed
  const formattedLocationData = locationData
    ? {
        village: locationData.village?.id || "",
        mandal: locationData.mandal_id || "",
        district: locationData.district_id || "",
        state: locationData.state_id || "",
        location_name:
          locationData.village?.name ||
          locationData.district ||
          locationData.state,
        location_type: locationData.village?.id
          ? "village"
          : locationData.mandal_id
          ? "mandal"
          : locationData.district_id
          ? "district"
          : "state",
      }
    : null;

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-gray-600 dark:text-gray-300">
          Loading location data...
        </div>
      </div>
    );
  }

  // If no location data is present, render the LocationSelector
  if (!locationData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Select Your Location</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please select your location to view local news
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <LocationSelector />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-600 dark:text-red-400">
          Failed to load location data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Local News Feed */}
      <LocalNewsFeed locationData={formattedLocationData} />
    </div>
  );
};

export default LocalNewsContainer;
