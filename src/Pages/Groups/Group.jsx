import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import GroupContent from "../../components/Groups/Group";

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <GroupContent />
      </Layout>
    </>
  );
};

export default Group;
