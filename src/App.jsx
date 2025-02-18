import React from "react";
import Navbar from "./components/Layouts/Navbar";
import InfiniteScroll from "./components/Home/InfiniteScroll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BelowHeader from "./components/Home/BelowHeader";
import NewsCard from "./components/Shared/NewsCard";
import Home from "./Pages/main/Home";
import Landing from "./Pages/Landing/Landing";

const App = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
