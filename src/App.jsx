import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsCard2 from "./components/Shared/NewsCard2";
import Home from "./Pages/main/Home";
import Signup from "./auth/Register";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newscard2" element={<NewsCard2 />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
