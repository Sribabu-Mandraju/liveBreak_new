import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import CategorySettings from "../../components/category-settings/CategorySettings";

const CategorySettingsPage = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <CategorySettings />
      </Layout>
    </>
  );
};

export default CategorySettingsPage;
