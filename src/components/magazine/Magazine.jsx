import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const Magazine = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const articles = [
    {
      id: 1,
      title: "మూవీ ప్రీమికుల కోసం... సినిమా.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50", // Replace with actual images
    },
    {
      id: 2,
      title: "రైతు నేస్తం..సాగుబడి.",
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
      title: "సినిమా ప్రీమికుల కోసం సినిమా.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 6,
      title: "రైతు నేస్తం - సాగుబడి.",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 7,
      title: "నేటి రాశి ఫలాలు 20. జూన్ .2024",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 8,
      title: "నేటి రాశి ఫలాలు 19. జూన్ .2024",
      date: "Jun 24",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen p-4`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Magazine</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="space-y-2">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {article.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Magazine;
