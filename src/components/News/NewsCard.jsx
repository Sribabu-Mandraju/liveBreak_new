import ReporterInfo from "./newsCard_components/ReporterInfo";
import NewsDetails from "./newsCard_components/NewsDetails";
import MediaContent from "./newsCard_components/MediaContent";
import LocationAndTime from "./newsCard_components/LocationAndTime";
import InteractionButtons from "./newsCard_components/InteractionButtons";
import { Link } from "react-router-dom";
const NewsCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg p-4 w-[93%] md:w-full mx-auto border dark:border-gray-700">
      <Link to={`/user/${data.posted_by._id}`}><ReporterInfo posted_by={data.posted_by} /></Link>
      <NewsDetails news={data.news} />
      <MediaContent news={data.news} />
      <InteractionButtons
        likes={data.likes}
        dislikes={data.dislikes}
        views={data.views}
        comments={data.comments}
        post_id={data._id}
      />
    </div>
  );
};

export default NewsCard;
