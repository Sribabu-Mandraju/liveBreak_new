import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import LocationContent from '../../auth/LocationSelector'

const Profile = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <LocationContent  />
      </Layout>
    </>
  );
};

export default Profile;
