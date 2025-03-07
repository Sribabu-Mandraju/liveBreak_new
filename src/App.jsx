import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/userSlice";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import Spinner
import Home from "./Pages/main/Home";
import Signup from "./auth/Register";
import Profile from "./Pages/Profile/Profile";
import UserProfile from "./Pages/UserProfile/UserProfile";
import MagazinePage from "./Pages/magazine/MagazinePage";
import Signin from "./auth/Login";
import OTPVerification from "./auth/OtpVerficationPage";
import Group from "./Pages/Groups/Group";
import NotFound from "./Pages/404/NotFound";
import Location from "./Pages/Location/Location";
import Model from "./components/shadcnui/Model";
import NewsDetails from "./components/news_details/NewsDetails";
import LocalNews from "./Pages/local_news/LocalNews";
import LocationAndTime from "./components/News/newsCard_components/LocationAndTime";
import AdsPage from "./Pages/Ads/AdsPage";
import ReferralPage from "./Pages/Referral/ReferralPage";
import CategorySettingsPage from "./Pages/CategorySettings/CategorySet";

import CategorySet from "./Pages/CategorySettings/CategorySet";
import Categories from "./Pages/Categories/Categories";
import Quizzes from './Pages/Quizzes/Quizzes';
import Contact from './Pages/Contact/Contact';
import TestResult from './Pages/Quizzes/TestResults/TestResult';
import Posters from './Pages/Posters/Posters'
import PostNews from "./Pages/PostNews/PostNews";
import BookMarks from './Pages/BookMarks/BookMarks'
import FeedPage from './Pages/Feed/FeedPage'
import VclipsPage from './Pages/Vclips/VclipsPage'
import { Book } from "lucide-react";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when route changes
  }, [pathname]);

  return null; // This component does not render anything
};

const App = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser()); // Fetch user on reload if token exists
    }
  }, [dispatch, token]); // Runs when token changes

  // Show loading spinner while fetching user data
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-white text-black dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<NewsDetails />} />
          <Route path="/localnews" element={<LocalNews />} />
          <Route path="/group" element={<Group />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/OTPVerification" element={<OTPVerification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/categories" element={<CategorySettingsPage />} />
          <Route path="/selectCategories" element={<CategorySet />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
          <Route path="/quizes" element={<Quizzes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/postnews" element={<PostNews />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/vclips" element={<VclipsPage />} />
          <Route path="/testresult/:id" element={<TestResult />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
