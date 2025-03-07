import { MdArrowRight, MdError } from "react-icons/md";
import { formatCreatedAtMonth } from "../../utils/formatCreatedAt";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearFeed, fetchMagazines } from "../../store/magazineSlice";
import { useInView } from "react-intersection-observer";

const Magazine = () => {
  const dispatch = useDispatch();
  const {
    data: articles,
    loading,
    error,
    hasMore,
  } = useSelector((state) => state.magazines);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  useEffect(() => {
    // dispatch(clearFeed());
    dispatch(fetchMagazines({}));
  }, [dispatch]);

  useEffect(() => {
    if (inView && hasMore) {
      dispatch(fetchMagazines({}));
    }
  }, [inView, hasMore, dispatch]);

  const handleReload = () => {
    dispatch(fetchMagazines({}));
  };

  const Skeleton = () => {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 animate-pulse">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-white text-gray-900 dark:bg-black dark:text-white">
      {error && (
        <div className="flex flex-col items-center justify-center h-64">
          <MdError className="text-red-500 text-6xl mb-4" />
          <p className="text-lg font-semibold">Something went wrong</p>
          <button
            onClick={handleReload}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reload
          </button>
        </div>
      )}

      {articles && articles.length > 0 && (
        <div className="space-y-2">
          {articles.map((article) => (
            <div
              key={article?._id}
              className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <img
                src={article?.news.image_urls[0]}
                alt={article?.news.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{article?.news.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCreatedAtMonth(article?.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No posts available.</p>
      )}

      {hasMore && (
        <div ref={ref} className="w-full">
          {loading && (
            <div className="flex flex-col gap-4 w-full">
              <div className="space-y-4">
                {[...Array(10)].map((_, index) => (
                  <Skeleton key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Magazine;
