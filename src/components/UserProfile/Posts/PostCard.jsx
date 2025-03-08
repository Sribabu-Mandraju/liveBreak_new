import { useEffect, useState } from "react";
import NewsCard from "../../News/NewsCard";

const PostCard = ({ data }) => {
  if (!data) {
    return null;
  }

  return <NewsCard data={data} />;
};

export default PostCard;
