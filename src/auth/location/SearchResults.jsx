import { FaMapMarkerAlt } from "react-icons/fa"

function SearchResults({ results, handleSelectLocation }) {
  return (
    <div className="mt-4 border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-gray-50 dark:bg-gray-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Search Results</h3>
      <ul className="space-y-2">
        {results.map((item) => (
          <li
            key={item._id}
            onClick={() => handleSelectLocation(item._id)}
            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.mandal.name}, {item.mandal.district.name}, {item.mandal.district.state.name}
              </p>
            </div>
            <FaMapMarkerAlt className="text-blue-500 text-lg" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults

