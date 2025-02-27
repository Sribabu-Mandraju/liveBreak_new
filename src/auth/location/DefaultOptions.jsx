import { FaMapMarkerAlt } from "react-icons/fa"

function DefaultOptions({ handleSelectLocation }) {
  const handleUseDefault = () => {
    // Assuming Vijayawada has a specific village_id
    // You would replace this with the actual ID
    handleSelectLocation("default_vijayawada_id")
  }

  const handleUseCurrentLocation = () => {
    // Get current location using browser geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would typically make an API call to convert
          // coordinates to a location ID
          console.log("Current location:", position.coords)
          // For now, we'll just simulate selecting a location
          handleSelectLocation("current_location_id")
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your current location. Please try another option.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  return (
    <>
      <button
        onClick={handleUseDefault}
        className="w-full flex items-center justify-center bg-[#1189F6] text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
      >
        <FaMapMarkerAlt className="mr-2" /> Continue default (Vijayawada - 520001)
      </button>

      <p className="text-center text-gray-500 dark:text-gray-400 my-4">OR</p>

      <button
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center justify-center bg-[#1189F6] text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
      >
        <FaMapMarkerAlt className="mr-2" /> Current Location
      </button>
    </>
  )
}

export default DefaultOptions

