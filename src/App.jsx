import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/main/Home";
import Signup from "./auth/Register";
import Profile from "./components/Profile/Profile";
import MagazinePage from "./Pages/Magazine/MagazinePage";
import Signin from "./auth/Login";
import OTPVerification from "./auth/OtpVerficationPage";

const App = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/OTPVerification" element={<OTPVerification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/magazine" element={<MagazinePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
