import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Posters from "../../components/Posters/Posters"

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Posters />
      </Layout>
    </>
  );
};

export default Group;
