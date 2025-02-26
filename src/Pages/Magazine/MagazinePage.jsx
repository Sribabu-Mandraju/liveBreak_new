import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import Layout from "../../components/Layouts/Layout";
import Magazine from "../../components/magazine/Magazine";

const MagazinePage = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <Magazine />
      </Layout>
    </>
  );
};

export default MagazinePage;
