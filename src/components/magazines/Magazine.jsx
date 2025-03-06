function Magazine() {
  // Sample Data
  const newsItems = [
    {
      id: 1,
      title: "మానసి ప్రేమికుల కోసం... సినిమా.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      title: "రైల్వే చర్చ - గోప్యమైనది.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      title: "రోజువారీ రాశి ఫలాలు 25.జూన్.2024",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      title: "Tech news.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      title: "సినిమా వార్తలు - సినీ వారం.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {/* News List */}
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {/* News Image */}
            <img
              src={item.image}
              alt="news"
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* News Content */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </p>
            </div>

            {/* Arrow Icon */}
            <span className="text-gray-400 dark:text-gray-500 text-lg">➜</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Magazine;
