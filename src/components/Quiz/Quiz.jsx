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
        const response = await axios.post(`${BASE_URL}/news/feed/post_type `, {
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
    <div className="relative w-full  md:max-w-7xl mx-auto container min-h-screen flex gap-4 dark:text-[#1189F6]">
      <div className="flex flex-col items-center bg-white  dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        <div className=" w-full px-4 flex flex-row gap-8 py-2 items-center ">
          <IoArrowBackCircle className="text-2xl text-blue-500" />

          <div className="text-xl font-semibold">Quiz</div>
        </div>

        <div className="w-full flex flex-col gap-2 ">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b p-2 px-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                    <div><img src={quiz?.news?.category?.icon}  /></div>
                    
                <div className="bg-blue-500 text-white px-2 py-1 rounded">
                  Quiz
                </div>

                </div>
                
                <div>
                  <p className="font-semibold">{quiz.title}</p>
                  <p className="text-sm text-gray-500">
                  {quiz?.news?.questions?.length || 0}  Questions
                  </p>
                  <p className="text-sm text-gray-500"> {new Date(quiz.createdAt).getFullYear()} {new Date(quiz.createdAt).toLocaleString('en-US', { month: 'long' })}</p>
                </div>
              </div>
              <button className="text-green-500">RESULTS</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
