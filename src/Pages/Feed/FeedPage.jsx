import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Feed from "../../components/feed/Feed"

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Feed />
      </Layout>
    </>
  );
};

export default Group;
