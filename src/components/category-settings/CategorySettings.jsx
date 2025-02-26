  import { useEffect } from "react";
  import useCategoryStore from "../../store/useCategoryStore";
  function CategorySettings() {
    const {
      categories,
      loading,
      fetchCategories,
      toggleSetting,
    } = useCategoryStore();

    useEffect(() => {
      fetchCategories();
    }, []);

    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
        <div className="w-[96%] max-w-lg p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Category Settings</h2>

          <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md flex justify-between items-center text-sm font-medium">
            <span>Turn on/off</span>
            <div className="flex space-x-10">
              <span>Notifications</span>
              <span>Feed</span>
            </div>
          </div>

          {loading ? (
            // Skeleton Loading Effect
            <div className="space-y-4 mt-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between p-2 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"
                >
                  <div className="w-32 h-4 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
                  <div className="flex space-x-4">
                    <div className="w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
                    <div className="w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Actual Category List
            <div className="space-y-4 mt-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  <span>{category.name}</span>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleSetting(category.id, "notifications")}
                      className={`w-8 h-4 rounded-full ${
                        category.notifications
                          ? "bg-purple-600"
                          : "bg-gray-400 dark:bg-gray-600"
                      }`}
                    ></button>
                    <button
                      onClick={() => toggleSetting(category.id, "feed")}
                      className={`w-8 h-4 rounded-full ${
                        category.feed
                          ? "bg-purple-600"
                          : "bg-gray-400 dark:bg-gray-600"
                      }`}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  export default CategorySettings;
