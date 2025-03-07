import Layout from "../../../components/Layouts/Layout";
import Navbar from "../../../components/Layouts/Navbar";
import TestResult from "../../../components/Quiz/TestResult"
import { useParams } from "react-router-dom";
const Group = () => {
    const { id } = useParams(); 
    
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <TestResult id={id}/>
      </Layout>
    </>
  );
};

export default Group;
