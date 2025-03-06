import React from "react";
import { useSelector } from "react-redux";
import { IoArrowBackCircle } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const token = useSelector((state) => state.auth.token);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE";
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/news/feed/post_type `,
          {
            post_type: "Quiz",
            version: "new",
          },
          {
            headers: {
              "X-News-Token": token,
            },
          }
        );
        setQuizzes(response.data?.data || []);
      } catch (error) {
        console.error("Error in fetching quizzes:", error);
      }
      setLoading(false);
    };
    fetchQuizzes();
  }, [BASE_URL]);

  return (
    <div className="relative w-full md:max-w-7xl mx-auto container min-h-screen p-2 sm:p-4 bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col items-center bg-white dark:bg-gray-900 p-3 sm:p-6 rounded-xl shadow-xl w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
          Available Quizzes
        </h1>
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 w-full"
            >
              <div className="flex items-start sm:items-center space-x-3 sm:space-x-6 w-full sm:w-auto">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-1 sm:p-2">
                    <img
                      src="https://meenews.co/assets/imgs/timer-clock.gif"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                      alt="Quiz Timer"
                    />
                  </div>
                  <span className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Quiz
                  </span>
                </div>

                <div className="space-y-1 sm:space-y-2 flex-1">
                  <h2 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-white line-clamp-2">
                    {quiz?.news?.title}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex items-center">
                      <span className="mr-2">📝</span>
                      {quiz?.news?.questions?.length || 0} Questions
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">📅</span>
                      {new Date(quiz.createdAt).toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base mt-3 sm:mt-0 w-full sm:w-auto">
                RESULTS
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
