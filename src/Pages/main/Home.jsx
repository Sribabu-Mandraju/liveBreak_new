import React from "react";
import NewsCard2 from "../../components/Shared/NewsCard2";
import Trending from "../../components/Home/Trending";
import SideMenu from "../../components/Home/SideMenu";

const Home = () => {
  return (
    <div className="w-full md:max-w-7xl mx-auto container min-h-screen flex gap-4">
      {/* Sidebar - Left (Sticky) */}
      <div className="hidden md:block w-1/4 h-[calc(100vh-30px)] sticky top-[10px]">
        <div className="border border-zinc-700 rounded-md h-full overflow-hidden">
          <SideMenu />
        </div>
      </div>

      {/* Main Content (Scrolls Normally) */}
      <div className="w-full md:w-2/4 flex flex-col">
        <div className="flex-grow">
          {[...Array(6)].map((_, index) => (
            <NewsCard2
              key={index}
              title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
              description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
              imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
              location="Tucson, AZ"
              time="1d"
              reactions={22}
              comments={21}
            />
          ))}
        </div>
      </div>

      {/* Sidebar - Right (Sticky) */}
      <div className="hidden md:block w-1/4 h-[calc(100vh-30px)] sticky top-[10px]">
        <div className="border border-zinc-700 rounded-md h-full overflow-hidden">
          <Trending />
        </div>
      </div>
    </div>
  );
};

export default Home;
