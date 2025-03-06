import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoArrowBackCircle } from "react-icons/io5";
const Categories = () => {

  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // const token = useSelector((state) => state.auth.token);
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYyMzZiZWQ5NzcwNDlmMDM1MGQ5OWZmMyJ9LCJpYXQiOjE3NDExNDk1NTIsImV4cCI6MTc3MjY4NTU1Mn0.6zvHQznRR-VriD3Gd8iGxLkeLE1weqvM0Pl0t7ykaZE"
  const [categories,setCategories]=useState([])
  useEffect(() => {
  const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/news/categories`,
          {
            headers: {
              "X-News-Token": token,
            },
          }
        );
        setCategories(response.data?.data || []);
      } catch (error) {
        console.error("Error in fetching Categories:", error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, [ BASE_URL]);
  

  const CategoriesSkeleton =()=>(
    <div className="animate-pulse">
      <div className="flex flex-wrap justify-center gap-6 px-6 py-4">
      {
         Array.from({ length: 10 }).map((_, index) => (
          
          <div
            key={index}
            className="flex flex-col border justify-center items-center p-2 w-24 rounded-lg  bg-gray-200 animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        ))
      }
      </div>
    </div>
  )
  

  return (
    <div className="relative w-full  md:max-w-7xl mx-auto container min-h-screen flex gap-4 dark:text-[#1189F6]">
      <div className="flex flex-col items-center bg-white  dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto sm:border dark:border-gray-700">
        <div className=" w-full px-4 flex flex-row gap-8 py-2 items-center ">
          
            <IoArrowBackCircle className="text-2xl text-blue-500"/>

          
          <div className="text-xl font-semibold">
            Categories
          </div>
          
        </div>
        <div className="text-gray-400 w-full px-6 text-xl py-4">
          Select any Categories
        </div>
         <div className="flex flex-wrap justify-center gap-6 px-6 py-4">

          {
            loading ? 
            <CategoriesSkeleton/> :
            categories.map((data)=>(
              <div className="flex flex-col border justify-center items-center p-2 rounded-lg w-24 duration-200 dark:hover:text-white dark:hover:bg-blue-500 border-gray-200 cursor-pointer bg-gray-100 hover:bg-gray-200">
                <div className="w-full text-center  flex justify-center items-center">
                  <img src={data.icon} className="w-12 h-12 " />
                </div>
                <div className="w-full text-xs text-center">
                  {data.name}
                </div>
                
              </div>
            ))

          }

          

        </div> 

      </div>
    </div>
  );
};

export default Categories;
