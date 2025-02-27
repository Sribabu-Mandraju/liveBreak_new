function FavoriteLocations({ favorites, handleSelectLocation }) {
    if (!favorites || favorites.length === 0) {
      return null
    }
  
    return (
      <>
        <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">Favourites</p>
        <ul className="mt-2 space-y-2">
          {favorites.map((fav) => (
            <li
              key={fav._id}
              onClick={() => handleSelectLocation(fav.village_id)}
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{fav.name}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }
  
  export default FavoriteLocations
  
  