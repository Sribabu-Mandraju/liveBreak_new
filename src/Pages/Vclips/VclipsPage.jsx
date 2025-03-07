import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Vclips from "../../components/vclips/Vclips"

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Vclips />
      </Layout>
    </>
  );
};

export default Group;
