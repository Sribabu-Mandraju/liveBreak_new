import ReporterInfo from "./newsCard_components/ReporterInfo"
import NewsDetails from "./newsCard_components/NewsDetails"
import MediaContent from "./newsCard_components/MediaContent"
import LocationAndTime from "./newsCard_components/LocationAndTime"
import InteractionButtons from "./newsCard_components/InteractionButtons"

const NewsCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-900 mt-3 rounded-lg shadow-lg p-4 w-[93%] md:w-full mx-auto border dark:border-gray-700">
      <ReporterInfo posted_by={data.posted_by} />
      <NewsDetails news={data.news} />
      <MediaContent news={data.news} />
      <LocationAndTime states={data.states} district={data.district} mandal={data.mandal} createdAt={data.createdAt} />
      <InteractionButtons likes={data.likes} views={data.views} comments={data.comments} />
    </div>
  )
}

export default NewsCard

