// Import Swiper core and required modules
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../../assets/logo.png";
// Import Swiper styles
import "swiper/css";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestedCommunities } from "../../store/communitySlice";

const GroupSkeleton = () => (
  <div className="w-full flex flex-col gap-2 h-[25vh] md:h-[35vh] border-gray-400 border rounded-lg animate-pulse">
    {/* Image skeleton */}
    <div className="w-full h-[55%] bg-gray-200 dark:bg-gray-700 rounded-t-lg">
      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-t-lg"></div>
    </div>

    {/* Content skeleton */}
    <div className="flex flex-row justify-between p-2 px-4 w-full">
      <div className="flex flex-col space-y-2 flex-1">
        {/* Title and verification */}
        <div className="flex items-center gap-2">
          <div className="h-5 md:h-6 w-32 md:w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        {/* Posts count */}
        <div className="h-4 w-20 md:w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
        {/* Followers count */}
        <div className="h-4 w-24 md:w-28 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Follow button */}
      <div className="flex items-start pt-1">
        <div className="h-8 w-16 md:w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export default () => {
  const dispatch = useDispatch();
  const { suggestedCommunities, status, error } = useSelector(
    (state) => state.community
  );
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      console.error("No auth token available");
      return;
    }
    console.log("Current token:", token); // Debug log
    dispatch(fetchSuggestedCommunities())
      .unwrap()
      .catch((error) => {
        console.error("Failed to fetch communities:", error);
      });
  }, [dispatch, token]);

  if (status === "failed") {
    return (
      <div className="w-full p-4 text-center">
        <p className="text-red-500">
          Failed to load communities. Please try again later.
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <Swiper
        className="w-[100%]"
        modules={[A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={false}
        style={{ overflow: "hidden" }}
      >
        {[1, 2, 3].map((_, index) => (
          <SwiperSlide key={index}>
            <GroupSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  if (!suggestedCommunities?.length) {
    return (
      <div className="w-full p-4 text-center">
        <p className="text-gray-500">No communities available.</p>
      </div>
    );
  }

  return (
    <Swiper
      className="w-[100%]"
      modules={[A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={false}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      style={{ overflow: "hidden" }}
    >
      {suggestedCommunities.map((community) => (
        <SwiperSlide key={community.id} className="">
          <div className="w-full flex flex-col items- gap-2 h-[25vh] md:h-[35vh] border-gray-400 border rounded-lg">
            <div className="w-full h-[55%] bg-gray-200 dark:bg-gray-800 rounded-lg">
              <img
                src={community.image || logo}
                className="w-full h-full rounded-lg object-cover"
                alt={community.name}
              />
            </div>
            <div className="flex flex-row justify-between p-1 px-4">
              <div className="flex flex-col">
                <div className="text-lg font-semibold flex flex-row items-center gap-2">
                  <span>{community.name}</span>
                  {community.isVerified && (
                    <RiCheckboxCircleFill className="text-green-500" />
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  <span>{community.posts_count || 0} posted</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>{community.followers_count || 0} are following</span>
                </div>
              </div>
              <div>
                <button className="py-1 px-4 text-white bg-blue-500 rounded-lg">
                  {community.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
