import { FaMapMarkerAlt } from "react-icons/fa";
function FavoriteLocations({ favorites, handleSelectLocation }) {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <>
      <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Favourites
      </p>
      <ul className="mt-2 space-y-2">
        {favorites.map((item) => (
          <li
            key={item._id}
            onClick={() => handleSelectLocation(item._id)}
            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.mandal.name}, {item.mandal.district.name},{" "}
                {item.mandal.district.state.name}
              </p>
            </div>
            <FaMapMarkerAlt className="text-blue-500 text-lg" />
          </li>
        ))}
      </ul>
    </>
  );
}

export default FavoriteLocations;
