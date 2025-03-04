import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import UserProfileContent from '../../components/UserProfile/UserProfileContent'
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { id } = useParams();

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Layout>
        <UserProfileContent data={id}/>
      </Layout>
    </>
  );
};

export default UserProfile;
