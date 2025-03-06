import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Categories from '../../components/Categories/Categories'

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Categories />
      </Layout>
    </>
  );
};

export default Group;
