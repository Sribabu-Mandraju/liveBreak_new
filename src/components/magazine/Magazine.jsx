import { MdArrowRight } from "react-icons/md";


const Magazine = () => {
  const articles = [
    {
      id: 1,
      title: "మూవీ ప్రీమికుల కోసం... సినిమా.",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 2,
      title: "రైతు నేస్తం..సాగుబడి.",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 3,
      title: "రోజువారీ రాశి ఫలాలు 25.జూన్.2024",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 4,
      title: "Tech news.",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 5,
      title: "సినిమా ప్రీమికుల కోసం సినిమా.",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 6,
      title: "రైతు నేస్తం - సాగుబడి.",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 7,
      title: "నేటి రాశి ఫలాలు 20. జూన్ .2024",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
    {
      id: 8,
      title: "నేటి రాశి ఫలాలు 19. జూన్ .2024",
      date: "Jun 24",
      image: "https://meebuddy.com/assets/img/meebuddy/slider/2.png"
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-white text-gray-900 dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-4">        
      </div>
      <div className="space-y-2">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
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
