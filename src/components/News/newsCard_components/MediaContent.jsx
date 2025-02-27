import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const MediaContent = ({ news }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (news?.video_urls?.length > 0) {
    return (
      <video controls className="w-full rounded-lg mt-3">
        <source src={news.video_urls[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  if (news?.image_urls?.length > 0) {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
      customPaging: (i) => <div className="text-sm text-gray-600">{`${i + 1}/${news.image_urls.length}`}</div>,
      appendDots: (dots) => <div className="mt-2 flex justify-center space-x-2">{dots}</div>,
    }

    return (
      <div className="relative mt-3">
        {/* Slide Indicator at Top Right */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
          {currentSlide + 1}/{news.image_urls.length}
        </div>

        {/* Image Slider */}
        <Slider {...settings} className="rounded-lg">
          {news.image_urls.map((url, index) => (
            <div key={index}>
              <img src={url || "/placeholder.svg"} alt={`News ${index + 1}`} className="w-full rounded-lg" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  return null
}

export default MediaContent

