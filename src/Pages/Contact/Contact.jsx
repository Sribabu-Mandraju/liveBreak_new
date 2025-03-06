import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Contact from '../../components/ContactUS/Contact'

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Contact />
      </Layout>
    </>
  );
};

export default Group;
