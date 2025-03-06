import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Quiz from '../../components/Quiz/Quiz'

const Group = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Quiz />
      </Layout>
    </>
  );
};

export default Group;
