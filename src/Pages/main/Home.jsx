import React from "react";
import Layout from "../../components/Layouts/Layout";
import PostFeed from "../../components/News/PostFeed";
import Navbar from "../../components/Layouts/Navbar";
import useAuthStore from "../../store/authStore";

const Home = () => {
  const token = useAuthStore((state) => state.token);
  console.log("User Token:", token);
  return (
    <>
      <Navbar />
      <Layout>
        <PostFeed />
      </Layout>
    </>
  );
};

export default Home;
