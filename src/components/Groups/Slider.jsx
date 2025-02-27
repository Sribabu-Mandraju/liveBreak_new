// Import Swiper core and required modules
import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from '../../assets/logo.png'
// Import Swiper styles
import 'swiper/css';
import { RiCheckboxCircleFill } from "react-icons/ri";

export default () => {
    const data=[
        {
            img:logo,
            title:"RGUKT IIT - Nuzvid",
            posts:51,
            followers:672,

        },
        {
            img:logo,
            title:"RGUKT IIT - Nuzvid",
            posts:51,
            followers:672,

        },
        {
            img:logo,
            title:"RGUKT IIT - Nuzvid",
            posts:51,
            followers:672,

        },
        {
            img:logo,
            title:"RGUKT IIT - Nuzvid",
            posts:51,
            followers:672,

        },
        

    ]
  return (
    <Swiper className='w-[100%] '
      // Use only necessary modules (no Navigation or Scrollbar)
      modules={[A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={false}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{ overflow: 'hidden' }} // Ensure no scrollbar
    >
        {
            data.map((data)=>(
                <SwiperSlide className=''>
                    <div className='w-full flex flex-col items- gap-2 h-[25vh] md:h-[35vh] border-gray-400 border  rounded-lg '>
                        <div className='w-full h-[55%] bg-gray-200 dark:bg-gray-800 rounded-lg'>
                            <img src={logo} className='w-full h-full rounded-lg' />

                        </div>
                        <div className='flex flex-row justify-between p-1 px-4'>
                            <div className='flex flex-col '>
                                <div className='text-lg font-semibold flex flex-row items-center gap-2'>
                                    <span>{data.title} </span><RiCheckboxCircleFill className='text-green-500'/>
                                </div>
                                <div className='text-sm text-gray-500'>
                                    <span>{data.posts} posted</span>
                                </div>
                                <div className='text-sm text-gray-500'>
                                    <span>{data.followers} are following</span>

                                </div>

                            </div>
                            <div>
                                <button className='py-1 px-4 text-white bg-blue-500 rounded-lg'>Follow</button>
                            </div>

                        </div>

                    </div>
                </SwiperSlide>

            ))
        }
      
      
    </Swiper>
  );
};
