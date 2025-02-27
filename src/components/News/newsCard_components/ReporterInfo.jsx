const ReporterInfo = ({ posted_by }) => (
    <div className="flex items-start space-x-4">
      <img
        src={posted_by?.profile_icon || "https://via.placeholder.com/40"}
        alt={posted_by?.name || "Reporter"}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {posted_by?.name || "Unknown Reporter"}
        </h3>
        <p className="text-xs text-gray-500">{posted_by?.reporter_type || "Reporter"}</p>
      </div>
    </div>
  )
  
  export default ReporterInfo
  
  