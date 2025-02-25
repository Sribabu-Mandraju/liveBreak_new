import React from "react";
import { useNavigate } from "react-router-dom";
import Flowers from "../../assets/Flowers.jpg";
import { LuPin } from "react-icons/lu";
import Layout from "../Layouts/Layout";
const NewsCard = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/content");
  };

  const cardData = [
    {
      image: Flowers,
      title: "www.mindset.com",
      description: `Mindset - Empowering Daily Planners & Journals for Inspired Living. Explore Mindset's empowering daily planners and journals, crafted to inspire and support your journey. Our products are designed to help you stay motivated, organized, and focused on achieving your goals every day.`,
      tags: ["Diaries", "Stationery", "Journals"],
    },
    {
      image: Flowers,
      title: "www.creativejournals.com",
      description: `Explore creative journals and planners designed for productivity. Stay organized, boost creativity, and track your journey effectively.`,
      tags: ["Writing", "Creativity", "Journals", "Planners"],
    },
    {
      image: Flowers,
      title: "www.journalhub.com",
      description: `Discover the best journals to enhance your daily productivity. Plan, reflect, and achieve your goals with our top-rated planners.`,
      tags: ["Notebooks", "Daily Logs", "Mindfulness"],
    },
    {
      image: Flowers,
      title: "www.journalhub.com",
      description: `Discover the best journals to enhance your daily productivity. Plan, reflect, and achieve your goals with our top-rated planners.`,
      tags: ["Notebooks", "Daily Logs", "Mindfulness"],
    },
    {
      image: Flowers,
      title: "www.journalhub.com",
      description: `Discover the best journals to enhance your daily productivity. Plan, reflect, and achieve your goals with our top-rated planners.`,
      tags: ["Notebooks", "Daily Logs", "Mindfulness"],
    },
    {
      image: Flowers,
      title: "www.journalhub.com",
      description: `Discover the best journals to enhance your daily productivity. Plan, reflect, and achieve your goals with our top-rated planners.`,
      tags: ["Notebooks", "Daily Logs", "Mindfulness"],
    },
    {
      image: Flowers,
      title: "www.journalhub.com",
      description: `Discover the best journals to enhance your daily productivity. Plan, reflect, and achieve your goals with our top-rated planners.`,
      tags: ["Notebooks", "Daily Logs", "Mindfulness"],
    },
    {
      image: Flowers,
      title: "www.journalhub.com",
      description: `Discover the best journals to enhance your daily productivity. Plan, reflect, and achieve your goals with our top-rated planners.`,
      tags: ["Notebooks", "Daily Logs", "Mindfulness"],
    },
  ];

  const tagColors = ["bg-blue-600", "bg-purple-600", "bg-teal-600"];

  console.log(cardData)

  return (
    <Layout>
    <div className=" max-w-screen-xl  mx-auto">
      <div className="grid grid-cols-1 gap-1">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="w-full p-2 md:p-3 shadow-xl rounded-xl bg-white dark:bg-gray-900 transition duration-300 hover:shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Section */}
              <div className="w-full lg:w-2/5 overflow-hidden relative group rounded-lg">
                <img
                  src={card.image}
                  className="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                  alt="Thumbnail"
                />
                <div className="w-12 h-12 rounded-full bg-blue-500 absolute flex justify-center items-center top-3 right-3 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <LuPin className="w-6 h-6 rotate-45 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-3/5 flex flex-col gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`${
                        tagColors[idx % tagColors.length]
                      } px-3 py-1 rounded-md text-white text-sm font-medium`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-black dark:text-white">
                  {card.title}
                </h2>

                {/* Description */}
                <p className="text-md text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {card.description}
                </p>

                {/* Read More Button */}
                <button
                  className="mt-4 w-40 h-12 rounded-full border-2 border-black dark:border-gray-400 flex justify-center items-center text-black dark:text-white font-semibold bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 shadow-md hover:shadow-lg"
                  onClick={handleReadMore}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default NewsCard;
