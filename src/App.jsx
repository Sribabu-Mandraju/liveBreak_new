import React from "react";
import Navbar from "./components/Layouts/Navbar";
import InfiniteScroll from "./components/Home/InfiniteScroll";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BelowHeader from "./components/Home/BelowHeader";
import NewsCard from "./components/Shared/NewsCard";
import Home from "./Pages/main/Home";
import Landing from "./Pages/Landing/Landing";
import PostFeed from "./components/Testing";
import Signup from "./auth/Register";

const App = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostFeed />} />
          <Route path="/new" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
};

export default App;
