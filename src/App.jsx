import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/main/Home";
import Signup from "./auth/Register";
import Profile from "./Pages/Profile/Profile";
import MagazinePage from "./Pages/Magazine/MagazinePage";
import Signin from "./auth/Login";
import OTPVerification from "./auth/OtpVerficationPage";
import useUserStore from "./store/useUserStore";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when route changes
  }, [pathname]);

  return null; // This component does not render anything
};

const App = () => {
  const fetchUser = useUserStore.getState().fetchUser;
  const status = useUserStore((state) => state.status);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      fetchUser();
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <ScrollToTop />
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
