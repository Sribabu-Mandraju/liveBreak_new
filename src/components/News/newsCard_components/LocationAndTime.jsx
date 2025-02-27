import { IoLocationOutline } from "react-icons/io5"

const LocationAndTime = ({ states, district, mandal, createdAt }) => (
  <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
    <div className="flex items-center gap-2">
      <IoLocationOutline className="text-[13px]" />
      <div className="">
        {states[0]?.name}, {district[0]?.name}, {mandal[0]?.name}
      </div>
    </div>

    <span className="ml-2">• {new Date(createdAt).toLocaleString()}</span>
  </div>
)

export default LocationAndTime

