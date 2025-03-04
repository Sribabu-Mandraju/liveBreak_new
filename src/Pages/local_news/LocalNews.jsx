import React from "react";
import LocalNewsContainer from "../../components/local_news/LocalNewsContainer";
import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";

const LocalNews = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <LocalNewsContainer />
      </Layout>
    </>
  );
};

export default LocalNews;
