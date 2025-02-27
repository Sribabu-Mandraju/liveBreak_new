const NewsDetails = ({ news }) => (
    <div className="mt-3">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{news?.title || "No Title"}</h2>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{news?.description || "No Description Available"}</p>
    </div>
  )
  
  export default NewsDetails
  
  