import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import ProfileContent from "../../components/profile/ProfileContent";

const Profile = () => {
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <Layout>
        <ProfileContent />
      </Layout>
    </>
  );
};

export default Profile;
