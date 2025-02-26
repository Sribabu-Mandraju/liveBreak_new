import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import PostFeed from "../../components/News/PostFeed";
import Navbar from "../../components/Layouts/Navbar";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
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
