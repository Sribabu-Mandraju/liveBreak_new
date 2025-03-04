import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../store/locationSlice";
import SearchInput from "./location/SearchInput";
import SearchResults from "./location/SearchResults";
import DefaultOptions from "./location/DefaultOptions";
import FavoriteLocations from "./location/FavoriteLocations";


function LocationSelector() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Favorite Locations
  useEffect(() => {
    fetchFavorites();
  }, []); // Removed unnecessary token dependency

  // Fetch search results with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (location.trim()) {
        fetchLocations();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [location]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        "https://api.meebuddy.com/app/v4/user-locations",
        {
          headers: {
            "X-Meebuddy-Token": token,
          },
        }
      );
      setFavorites(response.data.data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/common/search`, {
        key: location,
        type: "news",
        version: "new",
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setResults([]);
    }
    setLoading(false);
  };

  // Select a location and save globally
  const handleSelectLocation = async (village_id) => {
    dispatch(selectLocation({ village_id, token }));
    
  };

  return (
    <div className="">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-center text-[#1189F6]">
          Enter your location
        </h2>

        <SearchInput location={location} setLocation={setLocation} />

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 my-4">
            Loading...
          </p>
        )}

        {results.length > 0 && (
          <SearchResults
            results={results}
            handleSelectLocation={handleSelectLocation}
          />
        )}

        <p className="text-center text-gray-500 dark:text-gray-400 my-4">OR</p>

        <DefaultOptions handleSelectLocation={handleSelectLocation} />

        <FavoriteLocations
          favorites={favorites}
          handleSelectLocation={handleSelectLocation}
        />
      </div>
    </div>
  );
}

export default LocationSelector;
