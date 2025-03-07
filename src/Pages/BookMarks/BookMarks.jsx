import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import Bookmarks from "../../components/Bookmarks/Bookmarks"

const Post = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <Bookmarks />
      </Layout>
    </>
  );
};

export default Post;
