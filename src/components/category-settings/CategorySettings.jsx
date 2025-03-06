import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  toggleBlockPushNotify,
  toggleBlockFeed,
  selectAllCategories,
  selectCategoriesLoading,
} from "../../store/categorySlice";

function CategorySettings() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoriesLoading);
  const userId = useSelector((state) => state.auth.user?._id);

  // Memoize the blocked states for all categories
  const blockedStates = useMemo(() => {
    if (!categories || !userId) return {};

    return categories.reduce((acc, category) => {
      acc[category._id] = {
        isBlockedPushNotify:
          category.blocked_push_notify_users?.some(
            (user) => user._id === userId
          ) || false,
        isBlockedFeed:
          category.blocked_feed_users?.some((user) => user._id === userId) ||
          false,
      };
      return acc;
    }, {});
  }, [categories, userId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleTogglePushNotify = (categoryId, checked) => {
    dispatch(toggleBlockPushNotify({ category_id: categoryId, checked }));
  };

  const handleToggleFeed = (categoryId, checked) => {
    dispatch(toggleBlockFeed({ category_id: categoryId, checked }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <div className="w-[96%] max-w-lg p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Category Settings</h2>

        <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md flex justify-between items-center text-sm font-medium">
          <span>Category</span>
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
                <div className="flex space-x-8">
                  <div className="w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
                  <div className="w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Actual Category List
          <div className="space-y-4 mt-4">
            {categories.map((category) => {
              const { isBlockedPushNotify, isBlockedFeed } =
                blockedStates[category._id] || {};

              return (
                <div
                  key={category._id}
                  className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {category.icon && (
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-6 h-6 object-cover rounded"
                      />
                    )}
                    <span className="font-medium">{category.name}</span>
                  </div>

                  <div className="flex items-center space-x-8">
                    {/* Push Notification Toggle */}
                    <button
                      onClick={() =>
                        handleTogglePushNotify(
                          category._id,
                          !isBlockedPushNotify
                        )
                      }
                      className="relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none"
                    >
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          !isBlockedPushNotify
                            ? "bg-[#1189F6]"
                            : "bg-gray-400 dark:bg-gray-600"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-0.5 transform transition-transform bg-white w-4 h-4 rounded-full ${
                          !isBlockedPushNotify ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </button>

                    {/* Feed Toggle */}
                    <button
                      onClick={() =>
                        handleToggleFeed(category._id, !isBlockedFeed)
                      }
                      className="relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none"
                    >
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          !isBlockedFeed
                            ? "bg-[#1189F6]"
                            : "bg-gray-400 dark:bg-gray-600"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-0.5 transform transition-transform bg-white w-4 h-4 rounded-full ${
                          !isBlockedFeed ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySettings;
