import React, { useState, useEffect } from "react";

import axios from "axios";
import { ArrowLeft, CheckCircle, XCircle, Circle, Share2, ThumbsUp } from "lucide-react";

const TestResult = ({id}) => {
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE";
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/news/post`,
          { post_id: id, version: "new" },
          { headers: { "X-News-Token": token } }
        );
        setResults(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
      setLoading(false);
    };

    if (id) fetchResults();
  }, [id, BASE_URL]);

    // Calculate correct, wrong, and unanswered
    const answers = results?.news?.submissions?.[0]?.answers || [];
    const correctAnswers = answers.filter((ans) => ans.isCorrect)?.length;
    const wrongAnswers = answers.length - correctAnswers;
    const totalQuestions = results?.news?.questions?.length || 0;
    const unanswered = totalQuestions - answers.length;

    const SkeletonLoader = () => (
      <div className="p-8 animate-pulse ">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-6 w-3/4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
        <div className="flex justify-between mt-6">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
              </div>
            ))}
        </div>
      </div>
    );
  

  return (
    <div className="relative w-full   md:max-w-7xl mx-auto container mt-8 sm:mt-0 min-h-screen flex gap-4 dark:text-[#1189F6]">
      <div className="flex flex-col overflow-hidden items-center bg-white  dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
    <div className=" flex flex-col  gap-8 items-center justify-center w-full">
      
        {/* Header */}
        <div className="  flex gap-4 p-2 py-3 w-full justify-between  bg-blue-600 dark:bg-gray-800 items-center">
          <button className="flex items-center">
            <ArrowLeft className="mr-2 text-white" />
            <span className="text-lg font-semibold text-white">Test Analysis</span>
          </button>
          <div className=" text-white px-4 py-1 rounded-lg font-medium  transition">Solutions</div>
        </div>
        <div className="max-w-lg w-full items-center  rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:shadow-black  overflow-hidden">

        {loading ? (
          <SkeletonLoader />
        ) : (
        
        <div>
        <div className="p-8">
          <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold dark:text-gray-200 text-gray-800">{results?.news?.title}</h2>
          <img
                      src="https://meenews.co/assets/imgs/timer-clock.gif"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                      alt="Quiz Timer"
                    />
          </div>

          
          <div className="flex items-center ">
            <CheckCircle className="text-green-500 w-4 h-4 mr-3" />
            <span className="text-lg mr-3">Scored</span>
            <span className="text-xl  font-bold">{correctAnswers} / {totalQuestions}</span>
          </div>

          
          <div className="mt-2">
            <h3 className="text-sm font-semibold dark:text-gray-500 text-gray-700 mb-2">Question Distribution</h3>
            <div className="flex justify-between">
              <div className="text-green-600 flex items-center">
                <CheckCircle className="inline-block w-3 h-3 mr-2" />
                <span className="text-sm sm:text-lg">{correctAnswers} Correct</span>
              </div>
              <div className="text-red-600 flex items-center">
                <XCircle className="inline-block w-3 h-3 mr-2" />
                <span className="text-sm sm:text-lg">{wrongAnswers} Wrong</span>
              </div>
              <div className="text-yellow-600 flex items-center">
                <Circle className="inline-block w-3 h-3 mr-2" />
                <span className="text-sm sm:text-lg">{unanswered} Unanswered</span>
              </div>
            </div>
          </div>
        </div>

       
        <div className="p-5 dark:bg-gray-900 bg-gray-200 flex justify-between items-center ">
          <button className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <ThumbsUp className="w-5 h-5 mr-2" />
            <span>2.17K</span>
          </button>

          <button className="flex items-center text-gray-600 hover:text-indigo-500 transition">
            <Share2 className="w-5 h-5 mr-2" />
            <span>Share</span>
          </button>
        </div>
        </div>)}
        </div>
      
    </div>
    </div>
    </div>
  );
};

export default TestResult;
