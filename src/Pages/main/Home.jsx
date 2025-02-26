import React from "react";
import Layout from "../../components/Layouts/Layout";
import PostFeed from "../../components/News/PostFeed";
import Navbar from "../../components/Layouts/Navbar";

const Home = () => {
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
