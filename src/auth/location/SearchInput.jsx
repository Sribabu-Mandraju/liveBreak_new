import { FaMapMarkerAlt } from "react-icons/fa"

function SearchInput({ location, setLocation }) {
  return (
    <div className="mt-4">
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Enter your area name or pincode"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1189F6] focus:border-transparent transition duration-200"
        />
      </div>
    </div>
  )
}

export default SearchInput

