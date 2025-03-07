import Layout from "../../components/Layouts/Layout";
import Navbar from "../../components/Layouts/Navbar";
import PostNews from "../../components/PostNews/PostNews"

const Post = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Layout>
        <PostNews />
      </Layout>
    </>
  );
};

export default Post;
