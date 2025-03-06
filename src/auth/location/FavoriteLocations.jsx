import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function FavoriteLocations({ favorites, handleSelectLocation }) {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <FaMapMarkerAlt className="text-blue-500 text-xl" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Favourite Locations
        </h2>
      </div>

      <motion.ul className="space-y-3" variants={containerVariants}>
        {favorites.map((item) => (
          <motion.li
            key={item._id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectLocation(item._id)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
          >
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {item.mandal.name} • {item.mandal.district.name} •{" "}
                <span className="text-gray-500 dark:text-gray-500">
                  {item.mandal.district.state.name}
                </span>
              </p>
            </div>
            <div className="ml-4 transform group-hover:scale-110 transition-transform">
              <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 text-xl" />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default FavoriteLocations;
