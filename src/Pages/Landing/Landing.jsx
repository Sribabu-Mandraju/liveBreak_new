import React from "react";
import InfiniteScroll from "../../components/Home/InfiniteScroll";
import Home from "../main/Home";
import Navbar from "../../components/Layouts/Navbar";
const Landing = () => {
  return (
    <div className='flex flex-col gap-4 dark:bg-gray-950'>
        <Navbar/>
        <Home/>

    </div>
  );
};

export default Landing;
