import React from "react";
import Referral from "../../components/Referral/Referral";
import Navbar from "../../components/Layouts/Navbar";
import Layout from "../../components/Layouts/Layout";

const ReferralPage = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <Referral />
      </Layout>
    </>
  );
};

export default ReferralPage;
