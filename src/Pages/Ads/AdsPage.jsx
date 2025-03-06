import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import Layout from "../../components/Layouts/Layout";
import Ads from "../../components/ads/Ads";

const AdsPage = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <Ads />
      </Layout>
    </>
  );
};

export default AdsPage;
